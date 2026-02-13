import { createHmac } from 'crypto'
import { expect, test } from '@playwright/test'

const TEST_WEBHOOK_SECRET = 'whsec_test'
const TEST_ADMIN_TOKEN = 'test_admin_token'

function signedStripeHeaders(payload: string, secret: string) {
  const timestamp = Math.floor(Date.now() / 1000)
  const signature = createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`, 'utf8')
    .digest('hex')

  return {
    'stripe-signature': `t=${timestamp},v1=${signature}`,
    'content-type': 'application/json',
  }
}

test('invalid checkout payload is rejected', async ({ request }) => {
  const response = await request.post('/api/checkout', {
    data: { lines: [] },
  })

  expect(response.status()).toBe(400)
  const payload = (await response.json()) as { error?: string }
  expect(payload.error).toContain('empty')
})

test('webhook with invalid signature is rejected', async ({ request }) => {
  const response = await request.post('/api/stripe/webhook', {
    data: { id: 'evt_bad_sig', type: 'checkout.session.completed', data: { object: { id: 'cs_1' } } },
    headers: {
      'stripe-signature': 't=123,v1=invalid',
      'content-type': 'application/json',
    },
  })

  expect(response.status()).toBe(400)
})

test('unsupported webhook event is acknowledged as ignored', async ({ request }) => {
  const eventPayload = JSON.stringify({
    id: 'evt_unsupported_1',
    type: 'payment_intent.succeeded',
    data: { object: { id: 'pi_123' } },
  })

  const response = await request.post('/api/stripe/webhook', {
    data: eventPayload,
    headers: signedStripeHeaders(eventPayload, TEST_WEBHOOK_SECRET),
  })

  expect(response.status()).toBe(200)
  const payload = (await response.json()) as { ignored?: boolean }
  expect(payload.ignored).toBe(true)
})

test('supported webhook event fails safely when database is unavailable', async ({ request }) => {
  const eventPayload = JSON.stringify({
    id: 'evt_checkout_1',
    type: 'checkout.session.completed',
    data: { object: { id: 'cs_test_123' } },
  })

  const response = await request.post('/api/stripe/webhook', {
    data: eventPayload,
    headers: signedStripeHeaders(eventPayload, TEST_WEBHOOK_SECRET),
  })

  expect(response.status()).toBe(503)
  const payload = (await response.json()) as { error?: string }
  expect(payload.error).toContain('configuration')
})

test('order lookup fails safely when database is unavailable', async ({ request }) => {
  const response = await request.get('/api/orders/by-session/cs_test_missing')

  expect(response.status()).toBe(503)
  const payload = (await response.json()) as { error?: string }
  expect(payload.error).toContain('unavailable')
})

test('admin export is token-protected and fails safely without database config', async ({ request }) => {
  const unauthorized = await request.get('/api/admin/orders/export')
  expect(unauthorized.status()).toBe(401)

  const authorized = await request.get('/api/admin/orders/export?from=2026-02-01&to=2026-02-12', {
    headers: {
      'x-admin-export-token': TEST_ADMIN_TOKEN,
    },
  })

  expect(authorized.status()).toBe(503)
  const payload = (await authorized.json()) as { error?: string }
  expect(payload.error).toContain('configuration')
})
