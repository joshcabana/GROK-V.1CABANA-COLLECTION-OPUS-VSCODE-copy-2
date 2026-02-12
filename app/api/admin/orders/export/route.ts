import { NextRequest, NextResponse } from 'next/server'
import { dbQuery } from '@/lib/db'
import { EnvConfigError, requireServerEnv } from '@/lib/env'

type ExportRow = {
  created_at: string
  order_id: string
  status: 'paid' | 'refunded' | 'failed'
  customer_email: string
  subtotal_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  impact_cents: number
  currency: string
  item_count: number
  item_summary: string | null
}

type RateLimitBucket = {
  count: number
  resetAt: number
}

declare global {
  // eslint-disable-next-line no-var
  var __cabanaAdminExportRateLimit: Map<string, RateLimitBucket> | undefined
}

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 20

function getRateLimitStore() {
  if (!global.__cabanaAdminExportRateLimit) {
    global.__cabanaAdminExportRateLimit = new Map<string, RateLimitBucket>()
  }
  return global.__cabanaAdminExportRateLimit
}

function consumeRateLimit(key: string) {
  const now = Date.now()
  const store = getRateLimitStore()
  const existing = store.get(key)

  if (!existing || existing.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })

    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, retryAfterSeconds: 0 }
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    }
  }

  existing.count += 1
  store.set(key, existing)

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - existing.count,
    retryAfterSeconds: 0,
  }
}

function normalizeDateInput(value: string | null, fallback: Date) {
  const normalized = value?.trim() || ''
  const maybeDate = /^\d{4}-\d{2}-\d{2}$/.test(normalized)
    ? new Date(`${normalized}T00:00:00.000Z`)
    : fallback

  if (Number.isNaN(maybeDate.getTime())) {
    return null
  }

  return maybeDate
}

function asIsoDate(value: Date) {
  return value.toISOString().slice(0, 10)
}

function csvCell(value: unknown) {
  const raw = value == null ? '' : String(value)
  if (!/[",\n]/.test(raw)) return raw
  return `"${raw.replace(/"/g, '""')}"`
}

function toCsv(rows: ExportRow[]) {
  const header = [
    'created_at',
    'order_id',
    'status',
    'customer_email',
    'currency',
    'subtotal_cents',
    'shipping_cents',
    'tax_cents',
    'total_cents',
    'impact_cents',
    'item_count',
    'items',
  ]

  const lines = rows.map((row) =>
    [
      row.created_at,
      row.order_id,
      row.status,
      row.customer_email,
      row.currency,
      row.subtotal_cents,
      row.shipping_cents,
      row.tax_cents,
      row.total_cents,
      row.impact_cents,
      row.item_count,
      row.item_summary,
    ]
      .map(csvCell)
      .join(',')
  )

  return [header.join(','), ...lines].join('\n')
}

export async function GET(request: NextRequest) {
  try {
    const { ADMIN_EXPORT_TOKEN } = requireServerEnv(['DATABASE_URL', 'ADMIN_EXPORT_TOKEN'])

    const incomingToken = request.headers.get('x-admin-export-token')?.trim() || ''
    if (!incomingToken || incomingToken !== ADMIN_EXPORT_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized export token.' }, { status: 401 })
    }

    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown'
    const ip = forwardedFor.split(',')[0]?.trim() || 'unknown'
    const rateKey = `${ip}:${incomingToken}`
    const rate = consumeRateLimit(rateKey)

    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded for export endpoint.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.retryAfterSeconds),
          },
        }
      )
    }

    const url = new URL(request.url)
    const today = new Date()
    const defaultFrom = new Date(today)
    defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 30)

    const fromDate = normalizeDateInput(url.searchParams.get('from'), defaultFrom)
    const toDate = normalizeDateInput(url.searchParams.get('to'), today)

    if (!fromDate || !toDate || fromDate > toDate) {
      return NextResponse.json(
        { error: 'Invalid date range. Use from/to in YYYY-MM-DD format.' },
        { status: 400 }
      )
    }

    const from = asIsoDate(fromDate)
    const to = asIsoDate(toDate)

    const result = await dbQuery<ExportRow>(
      `
      SELECT
        o.created_at,
        o.id AS order_id,
        o.status,
        o.customer_email,
        o.subtotal_cents,
        o.shipping_cents,
        o.tax_cents,
        o.total_cents,
        o.impact_cents,
        o.currency,
        COALESCE(SUM(oi.quantity), 0)::int AS item_count,
        STRING_AGG(
          CONCAT(oi.product_name, ' x', oi.quantity),
          '; ' ORDER BY oi.created_at
        ) AS item_summary
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.created_at >= ($1::date)
        AND o.created_at < ($2::date + INTERVAL '1 day')
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [from, to]
    )

    const csv = toCsv(result.rows)
    const filename = `cabana-orders-${from}-to-${to}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
        'X-RateLimit-Remaining': String(rate.remaining),
      },
    })
  } catch (error) {
    if (error instanceof EnvConfigError) {
      return NextResponse.json(
        { error: 'Order export is unavailable due to missing configuration.', missingEnv: error.missing },
        { status: 503 }
      )
    }

    console.error(
      JSON.stringify({
        scope: 'admin_orders_export',
        message: 'export_failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    )

    return NextResponse.json({ error: 'Unable to export orders right now.' }, { status: 500 })
  }
}
