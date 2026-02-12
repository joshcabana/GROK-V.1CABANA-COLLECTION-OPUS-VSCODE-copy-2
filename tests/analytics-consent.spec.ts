import { expect, test } from '@playwright/test'

test('cookie consent remains usable when localStorage write throws', async ({ page }) => {
  await page.addInitScript(() => {
    const originalGetItem = Storage.prototype.getItem
    const originalSetItem = Storage.prototype.setItem

    Storage.prototype.getItem = function getItem(key: string) {
      if (key === 'cabana-analytics-consent') return null
      return originalGetItem.call(this, key)
    }

    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === 'cabana-analytics-consent') {
        throw new DOMException('Blocked', 'SecurityError')
      }
      return originalSetItem.call(this, key, value)
    }
  })

  await page.goto('/')
  await page.waitForTimeout(3500)

  const allowButton = page.getByRole('button', { name: 'Allow Analytics' })
  await expect(allowButton).toBeVisible({ timeout: 10000 })
  await allowButton.click()
  await expect(allowButton).toBeHidden()
})
