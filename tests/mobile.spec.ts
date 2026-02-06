import { test, expect } from '@playwright/test';

const urls = ['/', '/products', '/products/mens-boxer-brief-black', '/privacy', '/terms', '/cart'];
const widths = [375, 414, 430];

for (const width of widths) {
  test.describe(`mobile smoke @${width}px`, () => {
    for (const path of urls) {
      test(`no horizontal scroll and core UI usable: ${path}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

        const menuOpen = page.locator('button[aria-label="Open menu"]');
        if (await menuOpen.count()) {
          await menuOpen.first().click();
          await expect(page.locator('#mobile-nav')).toBeVisible();
        }

        const cartOpen = page.locator('button[aria-label="Open cart"]');
        if (await cartOpen.count()) {
          await cartOpen.first().click();
          await expect(page.getByRole('heading', { name: 'Your Bag' })).toBeVisible();
        }

        const imgs = page.locator('img');
        const sample = Math.min(3, await imgs.count());
        for (let i = 0; i < sample; i += 1) {
          const box = await imgs.nth(i).boundingBox();
          if (box) {
            expect(box.width).toBeGreaterThan(0);
            expect(box.height).toBeGreaterThan(0);
          }
        }
      });
    }
  });
}
