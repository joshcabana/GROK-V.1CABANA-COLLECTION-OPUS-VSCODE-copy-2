import { createHmac, timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { withDbTransaction, dbQuery } from '@/lib/db'
import { EnvConfigError, requireServerEnv } from '@/lib/env'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { sitePolicy } from '@/lib/policy'

export const dynamic = 'force-dynamic'

const SUPPORTED_EVENT_TYPE = 'checkout.session.completed'
const STRIPE_SIGNATURE_TOLERANCE_SECONDS = 300

type StripeWebhookEvent = {
  id: string
  type: string
  data?: {
    object?: StripeCheckoutSession
  }
}

type StripeCheckoutSession = {
  id?: string
  payment_intent?: string | null
  customer_email?: string | null
  customer_details?: {
    email?: string | null
    name?: string | null
  } | null
  shipping_details?: {
    name?: string | null
    address?: Record<string, unknown> | null
  } | null
  currency?: string | null
  amount_subtotal?: number | null
  amount_total?: number | null
  total_details?: {
    amount_shipping?: number | null
    amount_tax?: number | null
  } | null
  payment_status?: string | null
}

type StripeCheckoutLineItem = {
  id?: string
  description?: string
  quantity?: number
  amount_subtotal?: number | null
  price?: {
    id?: string
    unit_amount?: number | null
    product?:
      | {
          id?: string
          images?: string[]
          metadata?: Record<string, unknown>
        }
      | string
      | null
    metadata?: Record<string, unknown>
  } | null
}

type StripeLineItemsResponse = {
  data?: StripeCheckoutLineItem[]
  error?: {
    message?: string
  }
}

type StripeEventRow = {
  id: string
  status: 'processed' | 'ignored' | 'failed'
}

type PersistedOrder = {
  id: string
  stripeCheckoutSessionId: string
  customerEmail: string
  customerName: string | null
  currency: string
  totalCents: number
  impactCents: number
  itemCount: number
  createdAt: string
}

type OrderRow = {
  id: string
  customer_email: string
  customer_name: string | null
  currency: string
  total_cents: number
  impact_cents: number
  created_at: string
}

type InsertedEventRow = {
  id: string
}

function log(level: 'log' | 'warn' | 'error', message: string, details: Record<string, unknown>) {
  console[level](
    JSON.stringify({
      scope: 'stripe_webhook',
      message,
      ...details,
    })
  )
}

function parseSignatureHeader(signatureHeader: string) {
  const values = signatureHeader.split(',')
  let timestamp = 0
  const signatures: string[] = []

  for (const value of values) {
    const [key, raw] = value.split('=')
    if (!key || !raw) continue
    if (key === 't') {
      const parsed = Number(raw)
      if (Number.isInteger(parsed)) timestamp = parsed
    }
    if (key === 'v1') {
      signatures.push(raw)
    }
  }

  return { timestamp, signatures }
}

function compareDigest(a: string, b: string) {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

function verifyStripeSignature(rawBody: string, signatureHeader: string, webhookSecret: string) {
  const { timestamp, signatures } = parseSignatureHeader(signatureHeader)

  if (!timestamp || !signatures.length) return false

  const now = Math.floor(Date.now() / 1000)
  if (Math.abs(now - timestamp) > STRIPE_SIGNATURE_TOLERANCE_SECONDS) return false

  const signedPayload = `${timestamp}.${rawBody}`
  const expectedDigest = createHmac('sha256', webhookSecret)
    .update(signedPayload, 'utf8')
    .digest('hex')

  return signatures.some((signature) => compareDigest(signature, expectedDigest))
}

async function getOrPrepareStripeEventRow(event: StripeWebhookEvent): Promise<{ rowId: string; alreadyProcessed: boolean }> {
  const existing = await dbQuery<StripeEventRow>(
    'SELECT id, status FROM stripe_events WHERE stripe_event_id = $1 LIMIT 1',
    [event.id]
  )

  if (existing.rowCount) {
    const row = existing.rows[0]
    if (row.status === 'processed') {
      return { rowId: row.id, alreadyProcessed: true }
    }

    await dbQuery(
      `
      UPDATE stripe_events
      SET
        event_type = $2,
        payload_json = $3::jsonb,
        received_at = NOW(),
        processed_at = NULL,
        status = 'ignored',
        error_message = NULL
      WHERE id = $1
      `,
      [row.id, event.type, JSON.stringify(event)]
    )

    return { rowId: row.id, alreadyProcessed: false }
  }

  const inserted = await dbQuery<InsertedEventRow>(
    `
    INSERT INTO stripe_events (stripe_event_id, event_type, payload_json, status)
    VALUES ($1, $2, $3::jsonb, 'ignored')
    ON CONFLICT (stripe_event_id) DO NOTHING
    RETURNING id
    `,
    [event.id, event.type, JSON.stringify(event)]
  )

  if (inserted.rowCount) {
    return { rowId: inserted.rows[0].id, alreadyProcessed: false }
  }

  // Race-safe retry path when another request inserted the same event concurrently.
  const conflicted = await dbQuery<StripeEventRow>(
    'SELECT id, status FROM stripe_events WHERE stripe_event_id = $1 LIMIT 1',
    [event.id]
  )

  if (!conflicted.rowCount) {
    throw new Error('Unable to resolve stripe event row after unique conflict')
  }

  const conflictedRow = conflicted.rows[0]
  if (conflictedRow.status === 'processed') {
    return { rowId: conflictedRow.id, alreadyProcessed: true }
  }

  await dbQuery(
    `
    UPDATE stripe_events
    SET
      event_type = $2,
      payload_json = $3::jsonb,
      received_at = NOW(),
      processed_at = NULL,
      status = 'ignored',
      error_message = NULL
    WHERE id = $1
    `,
    [conflictedRow.id, event.type, JSON.stringify(event)]
  )

  return { rowId: conflictedRow.id, alreadyProcessed: false }
}

function normalizeLineItem(item: StripeCheckoutLineItem, index: number, currency: string, subtotalCents: number) {
  const quantity = Number.isInteger(item.quantity) && (item.quantity || 0) > 0 ? (item.quantity as number) : 1
  const unitAmountFromPrice = item.price?.unit_amount
  const unitAmountFromSubtotal = Math.round((Number(item.amount_subtotal) || subtotalCents || 0) / quantity)
  const unitAmountCents = Math.max(0, Number(unitAmountFromPrice ?? unitAmountFromSubtotal) || 0)
  const productName = (item.description?.trim() || `CABANA Item ${index + 1}`).slice(0, 160)

  const expandedProduct =
    item.price?.product && typeof item.price.product === 'object' ? item.price.product : null
  const imageUrl = expandedProduct?.images?.[0] || null

  return {
    productName,
    unitAmountCents,
    quantity,
    imageUrl,
    metadataJson: {
      stripe_line_item_id: item.id || null,
      stripe_price_id: item.price?.id || null,
      currency,
      stripe_price_metadata: item.price?.metadata || null,
      stripe_product_id: expandedProduct?.id || null,
      stripe_product_metadata: expandedProduct?.metadata || null,
    },
  }
}

async function fetchCheckoutSessionLineItems(
  sessionId: string,
  stripeSecretKey: string
): Promise<StripeCheckoutLineItem[]> {
  const url = new URL(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`)
  url.searchParams.set('limit', '100')
  url.searchParams.append('expand[]', 'data.price.product')

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
    },
  })

  const payload = (await response.json().catch(() => null)) as StripeLineItemsResponse | null

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Failed to fetch checkout session line items')
  }

  return Array.isArray(payload?.data) ? payload!.data! : []
}

async function persistOrderFromSession(
  eventRowId: string,
  session: StripeCheckoutSession,
  lineItems: StripeCheckoutLineItem[]
) {
  const sessionId = session.id
  if (!sessionId) throw new Error('Stripe checkout session id missing on webhook payload')

  const customerEmail = session.customer_details?.email || session.customer_email || null
  if (!customerEmail) throw new Error('Stripe checkout session missing customer email')

  const subtotalCents = Math.max(0, Number(session.amount_subtotal) || 0)
  const shippingCents = Math.max(0, Number(session.total_details?.amount_shipping) || 0)
  const taxCents = Math.max(0, Number(session.total_details?.amount_tax) || 0)
  const totalCents = Math.max(0, Number(session.amount_total) || subtotalCents + shippingCents + taxCents)
  const impactCents = Math.round(subtotalCents * (sitePolicy.impactPercent / 100))
  const currency = (session.currency || 'aud').toLowerCase()

  const normalizedLineItems =
    lineItems.length > 0
      ? lineItems.map((item, index) => normalizeLineItem(item, index, currency, subtotalCents))
      : [
          {
            productName: 'CABANA Order',
            unitAmountCents: subtotalCents,
            quantity: 1,
            imageUrl: null,
            metadataJson: {
              source: 'fallback',
            },
          },
        ]

  const order = await withDbTransaction(async (client) => {
    const status = session.payment_status === 'paid' ? 'paid' : 'failed'
    const shippingAddress = session.shipping_details?.address || null

    const upsertOrder = await client.query<OrderRow>(
      `
      INSERT INTO orders (
        stripe_checkout_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        currency,
        subtotal_cents,
        shipping_cents,
        tax_cents,
        total_cents,
        impact_cents,
        status,
        shipping_address_json
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb)
      ON CONFLICT (stripe_checkout_session_id)
      DO UPDATE SET
        stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id,
        customer_email = EXCLUDED.customer_email,
        customer_name = EXCLUDED.customer_name,
        currency = EXCLUDED.currency,
        subtotal_cents = EXCLUDED.subtotal_cents,
        shipping_cents = EXCLUDED.shipping_cents,
        tax_cents = EXCLUDED.tax_cents,
        total_cents = EXCLUDED.total_cents,
        impact_cents = EXCLUDED.impact_cents,
        status = EXCLUDED.status,
        shipping_address_json = EXCLUDED.shipping_address_json,
        updated_at = NOW()
      RETURNING id, customer_email, customer_name, currency, total_cents, impact_cents, created_at
      `,
      [
        sessionId,
        session.payment_intent || null,
        customerEmail,
        session.shipping_details?.name || session.customer_details?.name || null,
        currency,
        subtotalCents,
        shippingCents,
        taxCents,
        totalCents,
        impactCents,
        status,
        JSON.stringify(shippingAddress),
      ]
    )

    const orderRow = upsertOrder.rows[0]

    await client.query('DELETE FROM order_items WHERE order_id = $1', [orderRow.id])

    for (const item of normalizedLineItems) {
      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_name,
          unit_amount_cents,
          quantity,
          image_url,
          metadata_json
        ) VALUES ($1, $2, $3, $4, $5, $6::jsonb)
        `,
        [
          orderRow.id,
          item.productName,
          item.unitAmountCents,
          item.quantity,
          item.imageUrl,
          JSON.stringify(item.metadataJson),
        ]
      )
    }

    await client.query(
      `
      UPDATE stripe_events
      SET status = 'processed', processed_at = NOW(), error_message = NULL
      WHERE id = $1
      `,
      [eventRowId]
    )

    return {
      id: orderRow.id,
      stripeCheckoutSessionId: sessionId,
      customerEmail: orderRow.customer_email,
      customerName: orderRow.customer_name,
      currency: orderRow.currency,
      totalCents: orderRow.total_cents,
      impactCents: orderRow.impact_cents,
      itemCount: normalizedLineItems.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: orderRow.created_at,
    } satisfies PersistedOrder
  })

  return order
}

async function markEventFailed(eventRowId: string, error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown webhook processing error'

  await dbQuery(
    `
    UPDATE stripe_events
    SET status = 'failed', processed_at = NOW(), error_message = LEFT($2, 1000)
    WHERE id = $1
    `,
    [eventRowId, message]
  )
}

async function recordEmailResult(orderId: string, result: { id?: string; error?: string }) {
  if (result.id) {
    await dbQuery(
      `
      UPDATE orders
      SET
        confirmation_email_id = $2,
        confirmation_email_status = 'sent',
        confirmation_email_error = NULL,
        updated_at = NOW()
      WHERE id = $1
      `,
      [orderId, result.id]
    )
    return
  }

  await dbQuery(
    `
    UPDATE orders
    SET
      confirmation_email_status = 'failed',
      confirmation_email_error = LEFT($2, 1000),
      updated_at = NOW()
    WHERE id = $1
    `,
    [orderId, result.error || 'Unknown email delivery error']
  )
}

export async function POST(request: NextRequest) {
  let eventId = 'unknown'
  let eventType = 'unknown'

  try {
    const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = requireServerEnv([
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
    ])

    const rawBody = await request.text()
    const signatureHeader = request.headers.get('stripe-signature') || ''

    if (!signatureHeader) {
      log('warn', 'missing_signature', {})
      return NextResponse.json({ error: 'Missing Stripe-Signature header' }, { status: 400 })
    }

    const isValidSignature = verifyStripeSignature(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET)
    if (!isValidSignature) {
      log('warn', 'signature_verification_failed', {})
      return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 })
    }

    const event = JSON.parse(rawBody) as StripeWebhookEvent
    eventId = event.id || 'unknown'
    eventType = event.type || 'unknown'

    log('log', 'webhook_received', { eventId, eventType })

    if (event.type !== SUPPORTED_EVENT_TYPE) {
      log('log', 'event_ignored', { eventId, eventType })
      return NextResponse.json({ received: true, ignored: true })
    }

    requireServerEnv(['DATABASE_URL'])

    const { rowId, alreadyProcessed } = await getOrPrepareStripeEventRow(event)

    if (alreadyProcessed) {
      log('log', 'duplicate_event_ignored', { eventId, eventType })
      return NextResponse.json({ received: true, duplicate: true })
    }

    const session = event.data?.object
    if (!session?.id) {
      throw new Error('Stripe checkout.session.completed payload missing session id')
    }

    const lineItems = await fetchCheckoutSessionLineItems(session.id, STRIPE_SECRET_KEY)
    const order = await persistOrderFromSession(rowId, session, lineItems)

    log('log', 'order_upserted', {
      eventId,
      orderId: order.id,
      stripeCheckoutSessionId: order.stripeCheckoutSessionId,
      totalCents: order.totalCents,
      itemCount: order.itemCount,
    })

    try {
      const emailResult = await sendOrderConfirmationEmail({
        to: order.customerEmail,
        customerName: order.customerName,
        orderNumber: order.id.slice(0, 8).toUpperCase(),
        orderDateIso: order.createdAt,
        itemCount: order.itemCount,
        totalCents: order.totalCents,
        impactCents: order.impactCents,
        currency: order.currency,
      })

      await recordEmailResult(order.id, { id: emailResult.id })
      log('log', 'email_sent', {
        eventId,
        orderId: order.id,
        resendMessageId: emailResult.id,
      })
    } catch (emailError) {
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown email send failure'
      await recordEmailResult(order.id, { error: errorMessage })
      log('error', 'email_failed', {
        eventId,
        orderId: order.id,
        error: errorMessage,
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected webhook error'
    const missing = error instanceof EnvConfigError ? error.missing : []

    log('error', 'webhook_processing_failed', {
      eventId,
      eventType,
      error: message,
      missingEnv: missing,
    })

    if (error instanceof EnvConfigError) {
      return NextResponse.json(
        { error: 'Webhook configuration is incomplete.', missingEnv: error.missing },
        { status: 503 }
      )
    }

    if (eventId !== 'unknown') {
      const existing = await dbQuery<{ id: string }>(
        'SELECT id FROM stripe_events WHERE stripe_event_id = $1 LIMIT 1',
        [eventId]
      ).catch(() => null)

      const eventRowId = existing?.rows?.[0]?.id
      if (eventRowId) {
        await markEventFailed(eventRowId, error).catch(() => null)
      }
    }

    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 })
  }
}
