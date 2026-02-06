#!/usr/bin/env node

const DEFAULT_PATHS = [
  '/',
  '/products',
  '/products/mens-boxer-brief-black',
  '/products/womens-modal-set',
  '/products/signature-starter-set',
  '/assets/Images/HERO-BANNER.webp',
  '/assets/Images/optimised/boxers-back.jpg',
]

const WAIT_RETRIES = Number(process.env.CABANA_SMOKE_RETRIES || 20)
const WAIT_INTERVAL_MS = Number(process.env.CABANA_SMOKE_INTERVAL_MS || 3000)
const REQUEST_TIMEOUT_MS = Number(process.env.CABANA_SMOKE_TIMEOUT_MS || 10000)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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
    return { status: response.status, body }
  } finally {
    clearTimeout(timeout)
  }
}

function buildUrl(base, route) {
  return `${base.replace(/\/+$/, '')}${route}`
}

function getPaths() {
  const raw = process.env.CABANA_SMOKE_PATHS
  if (!raw) return DEFAULT_PATHS
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

async function waitUntilReady(baseUrl) {
  for (let attempt = 1; attempt <= WAIT_RETRIES; attempt += 1) {
    try {
      const { status } = await fetchWithTimeout(buildUrl(baseUrl, '/'))
      if (status === 200) return true
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(`[smoke-preview] Waiting for preview (${attempt}/${WAIT_RETRIES}): ${message}`)
    }
    await sleep(WAIT_INTERVAL_MS)
  }
  return false
}

async function run() {
  const previewUrl = process.argv[2]
  if (!previewUrl) {
    console.error('Usage: node scripts/smoke-preview.cjs <preview-url>')
    process.exit(1)
  }

  const isReady = await waitUntilReady(previewUrl)
  if (!isReady) {
    console.error(`[smoke-preview] Preview did not become ready: ${previewUrl}`)
    process.exit(1)
  }

  const paths = getPaths()
  const failures = []
  for (const route of paths) {
    const target = buildUrl(previewUrl, route)
    try {
      const { status, body } = await fetchWithTimeout(target)
      if (status !== 200) {
        failures.push(`${route} returned ${status}`)
        continue
      }
      if (route === '/' || route === '/products' || route.startsWith('/products/')) {
        if (body.includes('Image+Unavailable')) {
          failures.push(`${route} rendered fallback image placeholder`)
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      failures.push(`${route} failed: ${message}`)
    }
  }

  if (failures.length > 0) {
    console.error('[smoke-preview] Failed checks:')
    for (const failure of failures) console.error(`  - ${failure}`)
    process.exit(1)
  }

  console.error(`[smoke-preview] OK: ${paths.length} checks passed for ${previewUrl}`)
}

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[smoke-preview] Unexpected error: ${message}`)
  process.exit(1)
})
