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

- `pnpm install`: PASS
- `pnpm build`: PASS (Next `15.5.12`)
- `pnpm run test:smoke`: PASS (`73/73`)
- `PLAYWRIGHT_PORT=3102 pnpm run test:payments`: PASS (`6/6`)
- `pnpm run check:static`: PASS
- `pnpm audit --prod --audit-level=high`: PASS (`No known vulnerabilities found`)

## Post-Change Outcomes

- Redirect ownership consolidated:
  - source-of-truth in `next.config.js`
  - `vercel.json` now contains only caching headers
- Canonical metadata ownership consolidated to `public/`:
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/site.webmanifest`
  - `public/favicon.ico`
- Removed duplicate root metadata files:
  - `robots.txt`
  - `sitemap.xml`
  - `site.webmanifest`
  - `favicon.ico`
- `public/sitemap.xml` updated to canonical route set:
  - includes `/products/signature-starter-set`
  - includes current policy/contact/cart routes
  - removes obsolete `/products/signature-set`
- Empty placeholder directories removed:
  - `products/`
  - `dist/`
  - `public/images/`
- Security remediation completed in the target line:
  - `next` upgraded from `14.2.35` to `15.5.12`
  - high/critical advisories cleared per production audit

## Updated Files

- Added:
  - `README.md`
  - `docs/branch-hygiene.md`
  - `docs/repo-hygiene-audit.md`
- Updated:
  - `app/api/orders/by-session/[sessionId]/route.ts`
  - `app/order/success/page.tsx`
  - `app/products/[slug]/page.tsx`
  - `docs/handoff.md`
  - `docs/milestone-checklist.md`
  - `next-env.d.ts`
  - `package.json`
  - `pnpm-lock.yaml`
  - `public/sitemap.xml`
  - `scripts/check-static-routes.sh`
  - `vercel.json`
- Deleted:
  - `favicon.ico`
  - `robots.txt`
  - `site.webmanifest`
  - `sitemap.xml`
