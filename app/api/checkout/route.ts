import { NextRequest, NextResponse } from 'next/server'

type CheckoutLine = {
  title?: unknown
  priceCents?: unknown
  quantity?: unknown
  image?: unknown
}

type StripeCheckoutSession = {
  id?: string
  url?: string
  error?: {
    message?: string
  }
}

const MAX_LINES = 20
const MAX_QUANTITY = 20
const MIN_PRICE_CENTS = 50
const MAX_PRICE_CENTS = 200000

function normalizeLine(line: CheckoutLine) {
  const rawTitle = typeof line.title === 'string' ? line.title.trim() : ''
  const title = rawTitle.slice(0, 120) || 'CABANA Item'

  const rawPrice = Number(line.priceCents)
  const priceCents = Number.isInteger(rawPrice) ? rawPrice : 0
  if (priceCents < MIN_PRICE_CENTS || priceCents > MAX_PRICE_CENTS) return null

  const rawQuantity = Number(line.quantity)
  const quantity = Number.isInteger(rawQuantity) ? rawQuantity : 0
  if (quantity < 1 || quantity > MAX_QUANTITY) return null

  const image = typeof line.image === 'string' ? line.image : ''
  return { title, priceCents, quantity, image }
}

function absoluteAssetUrl(origin: string, pathOrUrl: string) {
  if (!pathOrUrl) return ''
  if (pathOrUrl.startsWith('https://') || pathOrUrl.startsWith('http://')) return pathOrUrl
  if (!pathOrUrl.startsWith('/')) return ''
  return `${origin}${pathOrUrl}`
}

function resolveOrigin(request: NextRequest) {
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL
  if (envOrigin) return envOrigin.replace(/\/$/, '')

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') || 'https'
  if (!host) return 'http://localhost:3000'
  return `${protocol}://${host}`
}

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if (!stripeSecret) {
    return NextResponse.json(
      { error: 'Checkout is temporarily unavailable.' },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => null)
  const inputLines = Array.isArray(body?.lines) ? (body.lines as CheckoutLine[]) : []

  if (!inputLines.length) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 })
  }

  const lines = inputLines
    .slice(0, MAX_LINES)
    .map(normalizeLine)
    .filter((line): line is NonNullable<ReturnType<typeof normalizeLine>> => !!line)

  if (!lines.length) {
    return NextResponse.json({ error: 'Unable to process cart items.' }, { status: 400 })
  }

  const origin = resolveOrigin(request)
  const params = new URLSearchParams()
  params.set('mode', 'payment')
  params.set('success_url', `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`)
  params.set('cancel_url', `${origin}/cart`)
  params.set('allow_promotion_codes', 'true')
  params.set('billing_address_collection', 'required')
  params.set('shipping_address_collection[allowed_countries][0]', 'AU')
  params.set('phone_number_collection[enabled]', 'true')
  params.set('submit_type', 'pay')
  params.set('automatic_tax[enabled]', 'true')
  params.set('metadata[source]', 'cabana-next-storefront')

  lines.forEach((line, index) => {
    params.set(`line_items[${index}][quantity]`, String(line.quantity))
    params.set(`line_items[${index}][price_data][currency]`, 'aud')
    params.set(`line_items[${index}][price_data][unit_amount]`, String(line.priceCents))
    params.set(`line_items[${index}][price_data][product_data][name]`, line.title)

    const image = absoluteAssetUrl(origin, line.image)
    if (image) params.set(`line_items[${index}][price_data][product_data][images][0]`, image)
  })

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const data = (await stripeResponse.json().catch(() => null)) as StripeCheckoutSession | null

  if (!stripeResponse.ok || !data?.url) {
    return NextResponse.json(
      { error: data?.error?.message || 'Unable to start checkout.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ id: data.id, url: data.url })
}
