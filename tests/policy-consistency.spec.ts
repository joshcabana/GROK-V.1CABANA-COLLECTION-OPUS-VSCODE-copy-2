import { expect, test } from '@playwright/test'

const canonicalEmail = 'Cabana.Collections2025@gmail.com'

test('shipping language is Australia-only on canonical policy pages', async ({ request }) => {
  const routes = ['/contact', '/shipping', '/returns', '/privacy', '/terms']

  for (const route of routes) {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).not.toMatch(/international shipping|select countries/i)
  }
})

test('canonical support email is consistent', async ({ request }) => {
  const routes = ['/contact', '/shipping', '/returns', '/privacy', '/terms', '/legal']

  for (const route of routes) {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain(canonicalEmail)
    expect(body).not.toMatch(/returns@|support@cabana\.com|help@cabana\.com/i)
  }
})

test('impact messaging uses the 15% model on canonical impact surfaces', async ({ request }) => {
  const routes = [
    '/impact',
    '/products/mens-boxer-brief-black',
    '/products/womens-modal-set',
    '/products/signature-starter-set',
  ]

  for (const route of routes) {
    const response = await request.get(route)
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('15%')
    expect(body).not.toMatch(/10%\s+of\s+every\s+purchase|10%\s+gives?\s+back/i)
  }
})
