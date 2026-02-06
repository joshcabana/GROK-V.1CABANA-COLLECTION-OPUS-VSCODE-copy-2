#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { chromium } = require('@playwright/test')

const REQUEST_TIMEOUT_MS = Number(process.env.CABANA_VISUAL_TIMEOUT_MS || 30000)
const ALLOW_EMPTY_TARGETS = process.env.CABANA_INSPECT_ALLOW_EMPTY === '1'
const FALLBACK_MARKER = 'Image+Unavailable'
const baseDir = process.cwd()
const routes = ['/', '/products', '/products/mens-boxer-brief-black', '/cart']
const devices = [
  { name: 'desktop-1280', viewport: { width: 1280, height: 900 } },
  { name: 'desktop-1440', viewport: { width: 1440, height: 900 } },
  { name: 'mobile-390', viewport: { width: 390, height: 844 } },
]

function normalizeUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '')
}

function getLatestPreviewUrl() {
  const latestPath = path.join(baseDir, 'reports', 'releases', 'latest.json')
  if (!fs.existsSync(latestPath)) return ''
  try {
    const parsed = JSON.parse(fs.readFileSync(latestPath, 'utf8'))
    return normalizeUrl(parsed.previewUrl)
  } catch {
    return ''
  }
}

function getTargetUrls(args) {
  const urls = new Set()
  const fromArgs = args.filter((arg) => !arg.startsWith('--')).map(normalizeUrl).filter(Boolean)
  for (const value of fromArgs) urls.add(value)

  for (const value of String(process.env.CABANA_LIVE_URLS || '').split(',').map(normalizeUrl).filter(Boolean)) {
    urls.add(value)
  }

  const preview = normalizeUrl(process.env.CABANA_PREVIEW_URL || '')
  if (preview) urls.add(preview)

  const promoted = normalizeUrl(process.env.CABANA_PROMOTED_URL || '')
  if (promoted) urls.add(promoted)

  if (args.includes('--latest-preview')) {
    const latest = getLatestPreviewUrl()
    if (latest) urls.add(latest)
  }

  if (urls.size === 0) {
    const latest = getLatestPreviewUrl()
    if (latest) urls.add(latest)
  }

  return [...urls]
}

function makeSafeName(input) {
  return input
    .replace(/^https?:\/\//, '')
    .replace(/[^\w.-]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function isHtmlRoute(route) {
  return route === '/' || route === '/products' || route.startsWith('/products/')
}

function routeToName(route) {
  if (route === '/') return 'home'
  return route.replace(/^\//, '').replace(/\//g, '__')
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

async function run() {
  const args = process.argv.slice(2)
  const targetUrls = getTargetUrls(args)

  const outputDir = path.join(baseDir, 'reports', 'releases')
  const screenshotRoot = path.join(outputDir, 'visual')
  const jsonPath = path.join(outputDir, 'visual-inspection.latest.json')
  const mdPath = path.join(outputDir, 'visual-inspection.latest.md')
  ensureDir(outputDir)
  ensureDir(screenshotRoot)

  if (targetUrls.length === 0) {
    const report = {
      generatedAt: new Date().toISOString(),
      status: ALLOW_EMPTY_TARGETS ? 'SKIPPED_NO_TARGETS' : 'FAILED_NO_TARGETS',
      routes,
      devices: devices.map((d) => d.name),
      targets: [],
      failures: [],
    }
    fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
    fs.writeFileSync(mdPath, '# Visual Inspection Report\n\n- Result: SKIPPED_NO_TARGETS\n', 'utf8')
    if (ALLOW_EMPTY_TARGETS) {
      console.error('[visual-inspection] SKIPPED: no target URLs configured.')
      process.exit(0)
    }
    console.error('[visual-inspection] FAILED: no target URLs configured.')
    process.exit(1)
  }

  const browser = await chromium.launch({ headless: true })
  const report = {
    generatedAt: new Date().toISOString(),
    status: 'PASSED',
    routes,
    devices: devices.map((d) => d.name),
    targets: [],
    failures: [],
  }

  try {
    for (const baseUrl of targetUrls) {
      const targetDir = path.join(screenshotRoot, makeSafeName(baseUrl))
      ensureDir(targetDir)
      const targetRecord = {
        baseUrl,
        checks: [],
      }

      for (const device of devices) {
        const context = await browser.newContext({ viewport: device.viewport })
        const page = await context.newPage()

        for (const route of routes) {
          const url = `${baseUrl}${route}`
          let status = 0
          let error = ''
          let hasFallback = false
          let screenshotPath = ''

          try {
            const response = await page.goto(url, { waitUntil: 'networkidle', timeout: REQUEST_TIMEOUT_MS })
            status = response ? response.status() : 0
            const html = await page.content()
            hasFallback = isHtmlRoute(route) ? html.includes(FALLBACK_MARKER) : false

            const fileName = `${device.name}__${routeToName(route)}.png`
            screenshotPath = path.join(targetDir, fileName)
            await page.screenshot({ path: screenshotPath, fullPage: true })
          } catch (err) {
            error = err instanceof Error ? err.message : String(err)
          }

          const check = {
            device: device.name,
            route,
            status,
            hasFallback,
            error,
            screenshot: screenshotPath ? path.relative(baseDir, screenshotPath) : '',
          }
          targetRecord.checks.push(check)

          if (status !== 200) {
            report.failures.push(`${baseUrl}${route} [${device.name}] returned ${status || 'ERR'} ${error}`.trim())
          }
          if (hasFallback) {
            report.failures.push(`${baseUrl}${route} [${device.name}] rendered fallback placeholder`)
          }
        }

        await context.close()
      }

      report.targets.push(targetRecord)
    }
  } finally {
    await browser.close()
  }

  if (report.failures.length > 0) {
    report.status = 'FAILED'
  }

  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const mdLines = ['# Visual Inspection Report', '']
  mdLines.push(`- Generated: ${report.generatedAt}`)
  mdLines.push(`- Result: ${report.status}`)
  mdLines.push(`- Targets: ${report.targets.map((t) => t.baseUrl).join(', ')}`)
  mdLines.push(`- Devices: ${report.devices.join(', ')}`)
  mdLines.push(`- Routes: ${report.routes.join(', ')}`)
  mdLines.push('')
  mdLines.push('| Target | Device | Route | Status | Fallback | Screenshot |')
  mdLines.push('| --- | --- | --- | --- | --- | --- |')
  for (const target of report.targets) {
    for (const check of target.checks) {
      mdLines.push(
        `| ${target.baseUrl} | ${check.device} | ${check.route} | ${check.status || 'ERR'} | ${
          check.hasFallback ? 'yes' : 'no'
        } | ${check.screenshot || '-'} |`,
      )
    }
  }
  if (report.failures.length > 0) {
    mdLines.push('')
    mdLines.push('## Failures')
    for (const failure of report.failures) mdLines.push(`- ${failure}`)
  }
  mdLines.push('')

  fs.writeFileSync(mdPath, `${mdLines.join('\n')}\n`, 'utf8')

  if (report.status === 'FAILED') {
    console.error('[visual-inspection] FAILED')
    for (const failure of report.failures) console.error(`  - ${failure}`)
    process.exit(1)
  }

  console.error(
    `[visual-inspection] PASSED: ${report.targets.length} target(s), ${devices.length} device profile(s), ${routes.length} route(s).`,
  )
  console.error(`[visual-inspection] Report: ${path.relative(baseDir, mdPath)}`)
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[visual-inspection] Unexpected error: ${message}`)
  process.exit(1)
})
