import { defineConfig, devices } from '@playwright/test'

const playwrightPort = Number(process.env.PLAYWRIGHT_PORT || 3100)
const playwrightBaseUrl = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${playwrightPort}`

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: playwrightBaseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'], reducedMotion: 'reduce' },
    },
  ],
  webServer: {
    command: `PORT=${playwrightPort} pnpm start`,
    url: playwrightBaseUrl,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
