# CABANA Handoff

## Product Vision (Do Not Drift)

- Premium, minimalist CABANA e-commerce experience with quiet luxury aesthetics.
- Preserve local photos as primary media source.
- Mobile-first performance and accessibility as release gates.
- Reliable checkout operations with durable order capture and clear support workflows.

## Current State Snapshot

- Date: 2026-02-13  
- Branch: `codex/repo-hygiene-pass-1`
- Base lineage: `codex/next-parity-followup-grok`
- Build status (`pnpm build`): PASS
- Smoke status (`pnpm run test:smoke`): PASS (`73/73`)
- Static policy checks (`pnpm run check:static`): PASS
- Payment API checks (`pnpm run test:payments`): PASS (`6/6`)
- Latest preview URL: https://skill-deploy-u5s5drszlv-codex-agent-deploys.vercel.app
- Latest claim URL: https://vercel.com/claim-deployment?code=070fc188-e428-4559-b438-2fe9c1e72061
- Latest deployment ID: `dpl_GeJxHAqgQGwt53sbB3fURD1nGSFK`
- Latest project ID: `prj_9WbeAR5DBUZMM6oG6kTpcAgnOTwD`
- Claim status: pending authenticated Vercel session

## Active Milestone

- Name: Repository hygiene and organization pass (conservative)
- Scope:
  - canonicalize metadata assets to `public/`
  - remove duplicate root SEO files
  - consolidate redirects source-of-truth to Next config
  - refresh operational docs and add baseline `README`
  - apply targeted security remediation for Next advisory
- Exit criteria:
  - build/tests/static checks green
  - docs reflect latest deployment + branch state
  - no duplicate root/public SEO artifacts

## Milestone Log

| Date | Milestone | What Changed | Validation | Open Risks | Owner |
| --- | --- | --- | --- | --- | --- |
| 2026-02-09 | Media/perf deploy candidate | Added dual-source PDP 360 media, tightened deploy packaging, refreshed LHCI dashboards, deployed preview | `pnpm build`, `pnpm test:smoke`, LHCI mobile/desktop pass | Preview readiness can lag briefly | Codex |
| 2026-02-12 | Fresh claimable deploy + smoke | Deployed preview and reran smoke checks | `pnpm build`, `pnpm run test:smoke` pass | Claim requires login | Codex |
| 2026-02-13 | Order operations stabilization | Added webhook/order persistence/export flow and tests | `pnpm build`, smoke + payment tests pass | Production verification requires env + DB migration | Codex |
| 2026-02-13 | Repository hygiene pass | Canonicalized metadata ownership, consolidated redirect checks, refreshed docs and branch hygiene records | Full validation matrix rerun in cleanup branch | Final merge + deploy pending | Codex |

## Next 3 Actions

1. Claim latest deployment in authenticated Vercel session:
   - https://vercel.com/claim-deployment?code=070fc188-e428-4559-b438-2fe9c1e72061
2. Set/verify production env and DB migration for order operations (`scripts/sql/001_orders.sql`).
3. Merge `codex/repo-hygiene-pass-1` after final review and deploy fresh preview.

## Blockers

- Claim flow cannot be completed in this environment without Vercel authentication.

## Notes

- Redirect source-of-truth is intended to remain in `next.config.js`.
- `vercel.json` should remain focused on hosting headers/caching policy.
- Canonical metadata assets should remain in `public/` only.
