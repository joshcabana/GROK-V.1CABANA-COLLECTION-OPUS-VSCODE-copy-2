# Repository Hygiene Audit

Date: 2026-02-13  
Branch: `codex/repo-hygiene-pass-1`  
Base: `codex/next-parity-followup-grok`

## Scope

Conservative hygiene pass focused on:

- canonical file placement and duplicate removal
- redirect/config source-of-truth cleanup
- docs currency and missing baseline docs
- targeted security remediation for active advisories
- no non-focused branch rewrites/deletions

## Baseline (Pre-Change)

### Branch matrix

`git for-each-ref --format='%(refname:short)|%(upstream:short)|%(upstream:trackshort)|%(committerdate:short)|%(subject)' refs/heads`

- `codex/next-parity-followup|origin/codex/next-parity-followup|=|2026-02-09|chore: align next parity with static 10pct and canonical policy routes`
- `codex/next-parity-followup-grok|origin/codex/next-parity-followup-grok|=|2026-02-13|style: apply consistent formatting by adding semicolons and adjusting spacing in API routes and scripts.`
- `codex/repo-hygiene-pass-1|||2026-02-13|style: apply consistent formatting by adding semicolons and adjusting spacing in API routes and scripts.`
- `codex/static-policy-release|||2026-02-09|Act with independence and forward`
- `codex/static-policy-release-scope|origin/codex/static-policy-release-scope|=|2026-02-09|release: static policy routing canon + support email + 10pct model`
- `grok|origin/grok|<|2026-02-10|Add cart drawer to layout`
- `perf-structure-refactor|origin/perf-structure-refactor|<|2026-02-05|Refactor legal page: add footer with navigation links and update sitemap to include legal index`

### Duplicate / drift findings

- Redirect tables duplicated in:
  - `next.config.js`
  - `vercel.json`
- Metadata files duplicated root vs public:
  - `robots.txt`
  - `sitemap.xml`
  - `site.webmanifest`
  - `favicon.ico`
- Sitemap drift identified (`root` vs `public`):
  - stale route in `public/sitemap.xml`: `/products/signature-set`
  - missing route in `public/sitemap.xml`: `/products/signature-starter-set`

### Dependency advisory snapshot

`pnpm audit --prod --audit-level=high`

- High advisory on `next`:
  - vulnerable: `>=13.0.0 <15.0.8`
  - patched: `>=15.0.8`
- Report summary: `2 vulnerabilities found (1 high, 1 moderate)`

### Documentation freshness findings

- `docs/handoff.md` had stale deployment links and previous milestone state.
- Repository lacked a top-level `README.md`.

### Pre-change verification log

- `pnpm build`: PASS
- `pnpm run test:smoke`: PASS (`73/73`)
- `pnpm run check:static`: PASS
- `pnpm run test:payments`: PASS (`6/6`)

## Changes Applied

- Canonicalized metadata ownership to `public/` and reconciled sitemap routes.
- Removed root duplicate metadata files.
- Consolidated `vercel.json` to hosting headers only.
- Updated static route checks to validate `next.config.js` and `public/sitemap.xml`.
- Added baseline repo docs and branch hygiene report.
- Refreshed handoff + milestone docs.
- Applied targeted Next security upgrade.

## Post-Change Verification (Final)

_To be updated after full post-change matrix run._

## Updated Files

_To be updated after full post-change matrix run._
