#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

function parseSize(input) {
  const normalized = String(input || '900k').trim().toLowerCase()
  const match = normalized.match(/^(\d+(?:\.\d+)?)([kmg])?$/)
  if (!match) return 900 * 1024
  const value = Number(match[1])
  const unit = match[2]
  if (!unit) return Math.floor(value)
  if (unit === 'k') return Math.floor(value * 1024)
  if (unit === 'm') return Math.floor(value * 1024 * 1024)
  if (unit === 'g') return Math.floor(value * 1024 * 1024 * 1024)
  return Math.floor(value)
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${bytes} B`
}

const cwd = process.cwd()
const dataFileArg = process.argv[2] || 'data/products.ts'
const publicDirArg = process.argv[3] || 'public'
const maxSizeArg = process.argv[4] || process.env.CABANA_DEPLOY_MAX_SIZE || '900k'

const dataFile = path.resolve(cwd, dataFileArg)
const publicDir = path.resolve(cwd, publicDirArg)
const maxBytes = parseSize(maxSizeArg)

if (!fs.existsSync(dataFile)) {
  console.error(`[validate-assets] Data file not found: ${dataFile}`)
  process.exit(1)
}

if (!fs.existsSync(publicDir)) {
  console.error(`[validate-assets] Public directory not found: ${publicDir}`)
  process.exit(1)
}

const source = fs.readFileSync(dataFile, 'utf8')
const urlRegex = /url:\s*'([^']+)'/g
const urls = new Set()
let match = null
while ((match = urlRegex.exec(source)) !== null) {
  urls.add(match[1])
}

if (urls.size === 0) {
  console.error('[validate-assets] No url entries found in product data.')
  process.exit(1)
}

const disallowed = []
const missing = []
const oversized = []

for (const url of urls) {
  if (!url.startsWith('/assets/Images/')) {
    disallowed.push(url)
    continue
  }

  const relativeToPublic = url.replace(/^\//, '')
  const absolutePath = path.join(publicDir, relativeToPublic)
  if (!fs.existsSync(absolutePath)) {
    missing.push(url)
    continue
  }

  const size = fs.statSync(absolutePath).size
  if (size > maxBytes) {
    oversized.push({ url, size })
  }
}

if (disallowed.length > 0) {
  console.error('[validate-assets] Found non-local asset URLs:')
  for (const url of disallowed) console.error(`  - ${url}`)
}

if (missing.length > 0) {
  console.error('[validate-assets] Found missing assets:')
  for (const url of missing) console.error(`  - ${url}`)
}

if (oversized.length > 0) {
  console.error(
    `[validate-assets] Found assets over limit (${formatBytes(maxBytes)} / CABANA_DEPLOY_MAX_SIZE=${maxSizeArg}):`,
  )
  for (const entry of oversized) {
    console.error(`  - ${entry.url} (${formatBytes(entry.size)})`)
  }
}

if (disallowed.length > 0 || missing.length > 0 || oversized.length > 0) {
  process.exit(1)
}

console.error(
  `[validate-assets] OK: validated ${urls.size} URLs in ${path.relative(cwd, dataFile)} against ${path.relative(
    cwd,
    publicDir,
  )} with limit ${formatBytes(maxBytes)}.`,
)
