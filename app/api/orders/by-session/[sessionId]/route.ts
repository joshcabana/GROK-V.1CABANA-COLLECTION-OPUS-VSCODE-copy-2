import { NextRequest, NextResponse } from 'next/server'
import { dbQuery } from '@/lib/db'
import { EnvConfigError, requireServerEnv } from '@/lib/env'
import { sitePolicy } from '@/lib/policy'

type OrderBySessionRow = {
  id: string
  status: 'paid' | 'refunded' | 'failed'
  currency: string
  subtotal_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  impact_cents: number
  customer_email: string
  created_at: string
  item_count: number
}

function maskEmail(email: string) {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  if (local.length <= 2) return `${local[0] || '*'}***@${domain}`
  return `${local.slice(0, 2)}***@${domain}`
}

export async function GET(
  _request: NextRequest,
  context: { params: { sessionId: string } }
) {
  try {
    requireServerEnv(['DATABASE_URL'])

    const sessionId = decodeURIComponent(context.params.sessionId || '').trim()
    if (!sessionId || sessionId.length > 255) {
      return NextResponse.json({ error: 'Invalid session id.' }, { status: 400 })
    }

    const result = await dbQuery<OrderBySessionRow>(
      `
      SELECT
        o.id,
        o.status,
        o.currency,
        o.subtotal_cents,
        o.shipping_cents,
        o.tax_cents,
        o.total_cents,
        o.impact_cents,
        o.customer_email,
        o.created_at,
        COALESCE(SUM(oi.quantity), 0)::int AS item_count
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.stripe_checkout_session_id = $1
      GROUP BY o.id
      LIMIT 1
      `,
      [sessionId]
    )

    if (!result.rowCount) {
      return NextResponse.json(
        {
          status: 'pending',
          message: 'Order not found yet. Please refresh in a moment.',
        },
        { status: 404 }
      )
    }

    const order = result.rows[0]

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.id.slice(0, 8).toUpperCase(),
      status: order.status,
      currency: order.currency,
      subtotalCents: order.subtotal_cents,
      shippingCents: order.shipping_cents,
      taxCents: order.tax_cents,
      totalCents: order.total_cents,
      impactCents: order.impact_cents,
      itemCount: order.item_count,
      customerEmailMasked: maskEmail(order.customer_email),
      supportEmail: sitePolicy.supportEmail,
      createdAt: order.created_at,
    })
  } catch (error) {
    if (error instanceof EnvConfigError) {
      return NextResponse.json(
        {
          error: 'Order lookup is unavailable due to missing configuration.',
          missingEnv: error.missing,
        },
        { status: 503 }
      )
    }

    console.error(
      JSON.stringify({
        scope: 'orders_by_session',
        message: 'lookup_failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    )

    return NextResponse.json({ error: 'Unable to load order status right now.' }, { status: 500 })
  }
}
