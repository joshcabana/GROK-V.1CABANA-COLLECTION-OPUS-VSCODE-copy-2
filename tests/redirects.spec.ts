import { expect, test } from '@playwright/test'

const redirects = [
  { from: '/index.html', to: '/' },
  { from: '/about.html', to: '/about' },
  { from: '/impact.html', to: '/impact' },
  { from: '/contact.html', to: '/contact' },
  { from: '/faq.html', to: '/faq' },
  { from: '/cart.html', to: '/cart' },
  { from: '/privacy-policy.html', to: '/privacy-policy' },
  { from: '/terms-of-service.html', to: '/terms-of-service' },
  { from: '/shipping-policy.html', to: '/shipping-policy' },
  { from: '/return-policy.html', to: '/return-policy' },
  { from: '/size-guide.html', to: '/size-guide' },
  { from: '/care-instructions.html', to: '/care-instructions' },
  { from: '/legal/index.html', to: '/legal' },
  { from: '/products/mens-underwear.html', to: '/products/mens-boxer-brief-black' },
  { from: '/products/mens-boxer-brief-black.html', to: '/products/mens-boxer-brief-black' },
  { from: '/products/womens-set.html', to: '/products/womens-set' },
  { from: '/privacy', to: '/privacy-policy' },
  { from: '/terms', to: '/terms-of-service' },
  { from: '/shipping', to: '/shipping-policy' },
  { from: '/returns', to: '/return-policy' },
  { from: '/care', to: '/care-instructions' },
  { from: '/products/womens-modal-set', to: '/products/womens-set' },
]

test.describe('legacy redirects', () => {
  for (const mapping of redirects) {
    test(`${mapping.from} -> ${mapping.to}`, async ({ baseURL, request }) => {
      const response = await request.get(mapping.from, { maxRedirects: 0 })
      expect([307, 308]).toContain(response.status())

      const location = response.headers()['location']
      expect(location).toBeTruthy()

      const normalized = new URL(location || '', baseURL || 'http://127.0.0.1:3101').pathname
      expect(normalized).toBe(mapping.to)
    })
  }
})
