#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const REQUEST_TIMEOUT_MS = Number(process.env.CABANA_INSPECT_TIMEOUT_MS || 10000)
const DEFAULT_ROUTES = [
  '/',
  '/products',
  '/products/mens-boxer-brief-black',
  '/products/womens-modal-set',
  '/products/signature-starter-set',
  '/cart',
  '/privacy',
  '/terms',
  '/assets/Images/HERO-BANNER.webp',
  '/assets/Images/optimised/boxers-back.jpg',
]
const FALLBACK_MARKER = 'Image+Unavailable'
const baseDir = process.cwd()

function parseRoutes() {
  const raw = process.env.CABANA_INSPECT_PATHS
  if (!raw) return DEFAULT_ROUTES
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

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

  const envUrls = (process.env.CABANA_LIVE_URLS || '')
    .split(',')
    .map(normalizeUrl)
    .filter(Boolean)
  for (const value of envUrls) urls.add(value)

  const promoted = normalizeUrl(process.env.CABANA_PROMOTED_URL || '')
  if (promoted) urls.add(promoted)

  const preview = normalizeUrl(process.env.CABANA_PREVIEW_URL || '')
  if (preview) urls.add(preview)

  if (args.includes('--latest-preview')) {
    const latestPreview = getLatestPreviewUrl()
    if (latestPreview) urls.add(latestPreview)
  }

  if (urls.size === 0) {
    const latestPreview = getLatestPreviewUrl()
    if (latestPreview) urls.add(latestPreview)
  }

  return [...urls]
}

function isHtmlRoute(route) {
  return route === '/' || route === '/products' || route.startsWith('/products/')
}

async function fetchWithTimeout(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
    })
    const body = await response.text()
    return {
      ok: response.status === 200,
      status: response.status,
      body,
      error: '',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return {
      ok: false,
      status: 0,
      body: '',
      error: message,
    }
  } finally {
    clearTimeout(timeout)
  }
}

function buildTarget(baseUrl, route) {
  return `${baseUrl}${route}`
}

function writeReports(report) {
  const outputDir = path.join(baseDir, 'reports', 'releases')
  fs.mkdirSync(outputDir, { recursive: true })
  const jsonPath = path.join(outputDir, 'live-inspection.latest.json')
  const mdPath = path.join(outputDir, 'live-inspection.latest.md')
  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const lines = ['# Live Inspection Report', '']
  lines.push(`- Generated: ${report.generatedAt}`)
  lines.push(`- Routes checked: ${report.routes.join(', ')}`)
  lines.push(`- Targets: ${report.targets.map((entry) => entry.baseUrl).join(', ')}`)
  lines.push(`- Result: ${report.failures.length > 0 ? 'FAILED' : 'PASSED'}`)
  lines.push('')
  lines.push('| Target | Route | Status | Fallback Placeholder | Error |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const target of report.targets) {
    for (const result of target.results) {
      lines.push(
        `| ${target.baseUrl} | ${result.route} | ${result.status} | ${result.hasFallback ? 'yes' : 'no'} | ${result.error || '-'} |`,
      )
    }
  }

  if (report.failures.length > 0) {
    lines.push('')
    lines.push('## Failures')
    for (const failure of report.failures) lines.push(`- ${failure}`)
  }

  lines.push('')
  fs.writeFileSync(mdPath, `${lines.join('\n')}\n`, 'utf8')
}

async function run() {
  const args = process.argv.slice(2)
  const targetUrls = getTargetUrls(args)
  const routes = parseRoutes()

  if (targetUrls.length === 0) {
    console.error(
      '[live-inspection] No target URLs supplied. Pass URLs as args, set CABANA_LIVE_URLS/CABANA_PREVIEW_URL/CABANA_PROMOTED_URL, or use --latest-preview.',
    )
    process.exit(1)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    routes,
    targets: [],
    failures: [],
  }

  for (const baseUrl of targetUrls) {
    const target = {
      baseUrl,
      results: [],
    }

    for (const route of routes) {
      const url = buildTarget(baseUrl, route)
      const response = await fetchWithTimeout(url)
      const hasFallback = isHtmlRoute(route) ? response.body.includes(FALLBACK_MARKER) : false
      const result = {
        route,
        status: response.status,
        hasFallback,
        error: response.error,
      }
      target.results.push(result)

      if (!response.ok) {
        report.failures.push(`${baseUrl}${route} returned ${response.status || 'ERR'} ${response.error}`.trim())
      }
      if (hasFallback) {
        report.failures.push(`${baseUrl}${route} rendered fallback placeholder`)
      }
    }

    report.targets.push(target)
  }

  writeReports(report)

  if (report.failures.length > 0) {
    console.error('[live-inspection] FAILED')
    for (const failure of report.failures) console.error(`  - ${failure}`)
    process.exit(1)
  }

  console.error(
    `[live-inspection] PASSED: ${report.targets.length} target(s), ${report.routes.length} route(s). Report: reports/releases/live-inspection.latest.md`,
  )
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[live-inspection] Unexpected error: ${message}`)
  process.exit(1)
})
