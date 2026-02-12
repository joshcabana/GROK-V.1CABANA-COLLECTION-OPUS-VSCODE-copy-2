import { expect, test } from '@playwright/test'

const canonicalEmail = 'support@cabanacollections.com.au'

test('shipping language is Australia-only on canonical policy pages', async ({ request }) => {
  const routes = ['/contact', '/shipping-policy', '/return-policy', '/privacy-policy', '/terms-of-service']

  for (const route of routes) {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).not.toMatch(/international shipping|select countries/i)
  }
})

test('canonical support email is consistent', async ({ request }) => {
  const routes = [
    '/contact',
    '/shipping-policy',
    '/return-policy',
    '/privacy-policy',
    '/terms-of-service',
    '/legal',
  ]

  for (const route of routes) {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain(canonicalEmail)
    expect(body).not.toMatch(/returns@|support@cabana\.com|help@cabana\.com/i)
  }
})

test('impact messaging uses the 10% model on canonical impact surfaces', async ({ request }) => {
  const routes = [
    '/impact',
    '/products/mens-boxer-brief-black',
    '/products/womens-set',
    '/products/signature-starter-set',
  ]

  for (const route of routes) {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('10%')
    expect(body).not.toContain('15%')
  }
})
