# CABANA Order Operations Runbook

## Purpose

This runbook covers the production checkout reliability pipeline for CABANA:

- Stripe hosted checkout session creation (`POST /api/checkout`)
- Stripe webhook capture (`POST /api/stripe/webhook`)
- Durable order persistence in Postgres
- Branded confirmation email via Resend
- Support export endpoint (`GET /api/admin/orders/export`)

## Required Environment Variables

Set these in Vercel for Production and Preview:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `ORDER_FROM_EMAIL`
- `ADMIN_EXPORT_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

## Database Migration

Apply migration:

- `scripts/sql/001_orders.sql`

Tables created:

- `orders`
- `order_items`
- `stripe_events`

## Stripe Webhook Setup

1. In Stripe Dashboard, create webhook endpoint:
   - URL: `https://<your-domain>/api/stripe/webhook`
2. Subscribe to events:
   - `checkout.session.completed`
3. Copy signing secret and set `STRIPE_WEBHOOK_SECRET`.

Local testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Operational Checks

After test checkout with Stripe test card (`4242 4242 4242 4242`):

1. `orders` row exists for session ID.
2. `order_items` rows exist and match line items.
3. `stripe_events` contains processed event.
4. Confirmation email status is recorded (`confirmation_email_status`).
5. `/order/success?session_id=...` shows verified paid state.

## Support Export

Endpoint:

- `GET /api/admin/orders/export?from=YYYY-MM-DD&to=YYYY-MM-DD`

Required header:

- `x-admin-export-token: <ADMIN_EXPORT_TOKEN>`

Response:

- CSV with order totals, status, item count, item summary.

## Failure Handling

- Webhook signature failure returns `400` and logs `signature_verification_failed`.
- Missing env returns `503` with missing keys in payload.
- Email failures do not roll back order writes; they are persisted as `confirmation_email_status='failed'`.
- Webhook retries are idempotent by:
  - `stripe_events.stripe_event_id` uniqueness
  - `orders.stripe_checkout_session_id` uniqueness

## Alert Recommendations

Create log-based alerts:

1. Webhook failures: more than 3 `webhook_processing_failed` events in 10 minutes.
2. Email failures: more than 5% `email_failed` over 1 hour.

## Manual Recovery

1. Find failed events in `stripe_events` where `status='failed'`.
2. Use Stripe Dashboard event replay for the same event ID.
3. Verify event transitions to `processed` and order row exists.
4. If email failed, trigger manual resend from support workflow.
