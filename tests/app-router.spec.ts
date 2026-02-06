import { expect, test, type Page } from '@playwright/test'

const overflowRoutes = ['/', '/products', '/products/mens-boxer-brief-black', '/cart']
const imageRoutes = ['/', '/products']
const pdpRoutes = [
  '/products/mens-boxer-brief-black',
  '/products/womens-modal-set',
  '/products/signature-starter-set',
]
const legalRoutes = ['/privacy', '/terms']

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

test('no horizontal overflow at 1440px desktop sweep', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'desktop-only behavior')
  await page.setViewportSize({ width: 1440, height: 900 })

  for (const route of overflowRoutes) {
    await page.goto(route)
    await page.waitForLoadState('domcontentloaded')
    await assertNoHorizontalOverflow(page)
  }
})

for (const route of imageRoutes) {
  test(`visible images are healthy: ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    await assertVisibleImagesHealthy(page)
  })
}

for (const route of pdpRoutes) {
  test(`visible images are healthy: ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    await assertVisibleImagesHealthy(page)
  })
}

for (const route of legalRoutes) {
  test(`legal route renders: ${route}`, async ({ page }) => {
    await page.goto(route)
    const heading = page.getByRole('heading', { level: 1 }).first()
    await expect(heading).toBeVisible()
  })
}

test('add-to-cart opens drawer and persists across refresh', async ({ page }) => {
  await page.goto('/products/mens-boxer-brief-black')

  const opener = page.getByRole('button', { name: 'Open cart' })
  const drawerPanel = page.locator('div[role="dialog"][aria-modal="true"]').first()
  const sizeSelector = page
    .locator('div')
    .filter({ has: page.getByText('Select size', { exact: true }) })
    .first()

  await sizeSelector.getByRole('button', { name: 'S', exact: true }).click()
  await page.getByRole('button', { name: /add to cart/i }).click()

  await expect(drawerPanel).toHaveClass(/translate-x-0/)
  await expect(opener.locator('span')).toHaveText('1')

  await page.getByRole('button', { name: 'Close cart' }).click()
  await expect(drawerPanel).toHaveClass(/translate-x-full/)

  await page.reload()
  await expect(opener.locator('span')).toHaveText('1')

  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Your Bag' })).toBeVisible()
  await expect(page.getByText("Men's Modal Boxer Brief").first()).toBeVisible()
})

test('cart empty state renders with CTA', async ({ page }) => {
  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Your bag is empty' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Start Shopping' })).toBeVisible()
})

test('desktop gallery supports keyboard thumbnail navigation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'desktop-only behavior')

  await page.goto('/products/mens-boxer-brief-black')

  const gallery = page.getByLabel('Product gallery')
  const thumb1 = page.getByRole('button', { name: 'Select image 1' })
  const thumb2 = page.getByRole('button', { name: 'Select image 2' })

  await gallery.focus()
  await expect(thumb1).toHaveClass(/border-ink/)
  await page.keyboard.press('ArrowRight')
  await expect(thumb2).toHaveClass(/border-ink/)
})

test('mobile sticky add-to-cart CTA remains visible', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only behavior')

  await page.goto('/products/mens-boxer-brief-black')
  const stickyBar = page.locator('div.fixed.bottom-0.left-0.right-0').first()

  await expect(stickyBar).toBeVisible()
  await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible()

  const position = await stickyBar.evaluate((node) => getComputedStyle(node).position)
  expect(position).toBe('fixed')
})

test('cart drawer focus trap and escape close', async ({ page }) => {
  await page.goto('/')

  const opener = page.getByRole('button', { name: 'Open cart' })
  await opener.click()

  const drawer = page.locator('div[role="dialog"][aria-modal="true"]').first()

  await expect(drawer).toHaveClass(/translate-x-0/)

  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press('Tab')
    const focusInside = await drawer.evaluate((node) => node.contains(document.activeElement))
    expect(focusInside).toBeTruthy()
  }

  await page.keyboard.press('Shift+Tab')
  const reverseFocusInside = await drawer.evaluate((node) => node.contains(document.activeElement))
  expect(reverseFocusInside).toBeTruthy()

  await page.keyboard.press('Escape')
  await expect(drawer).toHaveClass(/translate-x-full/)
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
