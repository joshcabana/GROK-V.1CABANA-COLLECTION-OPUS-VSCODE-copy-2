import { expect, test } from '@playwright/test'

const redirects = [
  { from: '/index.html', to: '/' },
  { from: '/about.html', to: '/about' },
  { from: '/impact.html', to: '/impact' },
  { from: '/contact.html', to: '/contact' },
  { from: '/privacy-policy.html', to: '/privacy' },
  { from: '/terms-of-service.html', to: '/terms' },
  { from: '/shipping-policy.html', to: '/shipping' },
  { from: '/return-policy.html', to: '/returns' },
  { from: '/size-guide.html', to: '/size-guide' },
  { from: '/care-instructions.html', to: '/care' },
  { from: '/legal/index.html', to: '/legal' },
  { from: '/cart.html', to: '/cart' },
  { from: '/products/mens-underwear.html', to: '/products/mens-boxer-brief-black' },
  { from: '/products/mens-boxer-brief-black.html', to: '/products/mens-boxer-brief-black' },
  { from: '/products/womens-set.html', to: '/products/womens-modal-set' },
  { from: '/faq.html', to: '/contact' },
]

test.describe('legacy redirects', () => {
  for (const mapping of redirects) {
    test(`${mapping.from} -> ${mapping.to}`, async ({ baseURL, request }) => {
      const normalizePath = (location: string) =>
        new URL(location, baseURL || 'http://127.0.0.1:3101').pathname

      const response = await request.get(mapping.from, { maxRedirects: 0 })
      expect([307, 308]).toContain(response.status())

      const location = response.headers()['location']
      expect(location).toBeTruthy()

      const firstHop = normalizePath(location || '')
      if (firstHop === mapping.to) return

      const strippedHtml = mapping.from.replace(/\.html$/, '')
      expect(firstHop).toBe(strippedHtml)

      const secondResponse = await request.get(firstHop, { maxRedirects: 0 })
      expect([307, 308]).toContain(secondResponse.status())

      const secondLocation = secondResponse.headers()['location']
      expect(secondLocation).toBeTruthy()
      const secondHop = normalizePath(secondLocation || '')
      expect(secondHop).toBe(mapping.to)
    })
  }
})
