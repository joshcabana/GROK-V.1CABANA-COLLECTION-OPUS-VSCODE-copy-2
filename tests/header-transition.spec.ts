import { expect, test } from '@playwright/test'

test('brand wordmark overlay keeps measurable geometry after client route transition', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })

  await page.goto('/')
  await page.locator('header').getByRole('link', { name: 'Shop' }).click()
  await expect(page).toHaveURL(/\/products$/)

  await page.locator('header').getByRole('link', { name: 'Home' }).click()
  await expect(page).toHaveURL(/\/$/)

  await page.evaluate(() => window.scrollTo(0, 260))
  await page.waitForTimeout(80)

  const overlayWidth = await page.getByTestId('brand-wordmark-overlay').evaluate((element) => {
    return window.getComputedStyle(element).width
  })

  expect(Number.parseFloat(overlayWidth)).toBeGreaterThan(0)
})
