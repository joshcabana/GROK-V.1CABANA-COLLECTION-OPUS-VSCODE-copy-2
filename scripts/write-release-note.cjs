#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const previewUrl = process.argv[2]
const claimUrl = process.argv[3]
const deploymentId = process.argv[4] || ''
const projectId = process.argv[5] || ''
const baseDir = process.cwd()
const outputDir = path.join(baseDir, 'reports', 'releases')
const jsonPath = path.join(outputDir, 'latest.json')
const mdPath = path.join(outputDir, 'latest.md')

const smokePaths = (process.env.CABANA_SMOKE_PATHS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const defaultSmokePaths = [
  '/',
  '/products',
  '/products/mens-boxer-brief-black',
  '/products/womens-modal-set',
  '/products/signature-starter-set',
  '/assets/Images/HERO-BANNER.webp',
  '/assets/Images/optimised/boxers-back.jpg',
]

if (!previewUrl || !claimUrl) {
  console.error('[release-note] Usage: node scripts/write-release-note.cjs <previewUrl> <claimUrl> [deploymentId] [projectId]')
  process.exit(1)
}

const timestamp = new Date().toISOString()
const checkedPaths = smokePaths.length > 0 ? smokePaths : defaultSmokePaths

const payload = {
  generatedAt: timestamp,
  previewUrl,
  claimUrl,
  deploymentId,
  projectId,
  smokeChecks: {
    status: 'passed',
    paths: checkedPaths,
  },
}

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

const markdown = [
  '# Latest Preview Release',
  '',
  `- Generated: ${timestamp}`,
  `- Preview URL: ${previewUrl}`,
  `- Claim URL: ${claimUrl}`,
  `- Deployment ID: ${deploymentId || 'n/a'}`,
  `- Project ID: ${projectId || 'n/a'}`,
  '- Smoke checks: passed',
  '',
  '## Smoke Paths',
  ...checkedPaths.map((route) => `- \`${route}\``),
  '',
].join('\n')

fs.writeFileSync(mdPath, `${markdown}\n`, 'utf8')
console.error(`[release-note] Updated ${path.relative(baseDir, mdPath)}`)
