import { expect, test, type Page } from '@playwright/test'

const overflowRoutes = ['/', '/products', '/products/mens-boxer-brief-black', '/cart']
const imageRoutes = ['/', '/products', '/products/mens-boxer-brief-black']

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth - document.documentElement.clientWidth
  })
  expect(overflow).toBeLessThanOrEqual(1)
}

async function assertVisibleImagesHealthy(page: Page) {
  const summary = await page.evaluate(() => {
    const visibleImages = Array.from(document.querySelectorAll('img')).filter((img) => {
      const hasBox = img.getClientRects().length > 0
      return hasBox && img.clientWidth > 0 && img.clientHeight > 0
    })

    const broken = visibleImages
      .filter((img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
      .map((img) => img.currentSrc || img.src)

    const fallback = visibleImages
      .filter((img) => (img.currentSrc || img.src).includes('placehold.co'))
      .map((img) => img.currentSrc || img.src)

    return {
      visibleCount: visibleImages.length,
      broken,
      fallback,
    }
  })

  expect(summary.visibleCount).toBeGreaterThan(0)
  expect(summary.broken).toEqual([])
  expect(summary.fallback).toEqual([])
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })
})

for (const route of overflowRoutes) {
  test(`no horizontal overflow: ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('domcontentloaded')
    await assertNoHorizontalOverflow(page)
  })
}

for (const route of imageRoutes) {
  test(`visible images are healthy: ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    await assertVisibleImagesHealthy(page)
  })
}

test('add-to-cart opens drawer and persists across refresh', async ({ page }) => {
  await page.goto('/products/mens-boxer-brief-black')

  await page.getByRole('button', { name: 'S' }).first().click()
  await page.getByRole('button', { name: /add to cart/i }).click()

  const drawer = page
    .locator('div[role="dialog"][aria-modal="true"]')
    .filter({ hasText: 'Your Bag' })
    .first()

  await expect(drawer).toBeVisible()
  await expect(drawer.getByText("Men's Modal Boxer Brief")).toBeVisible()

  await page.getByRole('button', { name: 'Close cart' }).click()
  await expect(drawer).not.toBeVisible()

  await page.reload()
  await page.getByRole('button', { name: 'Open cart' }).click()
  await expect(drawer).toBeVisible()
  await expect(drawer.getByText("Men's Modal Boxer Brief")).toBeVisible()

  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Your Bag' })).toBeVisible()
  await expect(page.getByText("Men's Modal Boxer Brief")).toBeVisible()
})

test('cart drawer focus trap and escape close', async ({ page }) => {
  await page.goto('/')

  const opener = page.getByRole('button', { name: 'Open cart' })
  await opener.click()

  const drawer = page
    .locator('div[role="dialog"][aria-modal="true"]')
    .filter({ hasText: 'Your Bag' })
    .first()

  await expect(drawer).toBeVisible()

  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press('Tab')
    const focusInside = await drawer.evaluate((node) => node.contains(document.activeElement))
    expect(focusInside).toBeTruthy()
  }

  await page.keyboard.press('Shift+Tab')
  const reverseFocusInside = await drawer.evaluate((node) => node.contains(document.activeElement))
  expect(reverseFocusInside).toBeTruthy()

  await page.keyboard.press('Escape')
  await expect(drawer).not.toBeVisible()
  await expect(opener).toBeFocused()
})

test('mobile zoom modal focus trap and escape close', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only behavior')

  await page.goto('/products/mens-boxer-brief-black')

  const zoomTrigger = page.getByRole('button', { name: /zoom/i }).first()
  await zoomTrigger.click()

  const zoomModal = page
    .locator('div[role="dialog"][aria-modal="true"]')
    .filter({ has: page.locator('div[style*="touch-action: pinch-zoom"]') })

  await expect(zoomModal).toBeVisible()

  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press('Tab')
    const focusInside = await zoomModal.first().evaluate((node) => node.contains(document.activeElement))
    expect(focusInside).toBeTruthy()
  }

  await page.keyboard.press('Escape')
  await expect(zoomModal).toHaveCount(0)
  await expect(zoomTrigger).toBeFocused()
})
