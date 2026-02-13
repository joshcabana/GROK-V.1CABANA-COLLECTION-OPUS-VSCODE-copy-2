# Milestone Checklist

Use this at every meaningful checkpoint.

## Definition

A milestone is complete when one significant slice of the product is functional and recoverable.

## Required Steps

1. Run `pnpm run checkpoint`.
2. Run `pnpm run checkpoint:save`.
3. Update current-state docs:
   - `docs/handoff.md`
   - `docs/repo-hygiene-audit.md` (if hygiene/security changed)
4. Run targeted validation for the slice (build, smoke, static checks, or payment tests).
5. Commit with `milestone: <name>`.

## Canonical Current-State Docs

- Project handoff: `docs/handoff.md`
- Repository hygiene status: `docs/repo-hygiene-audit.md`
- Branch policy/status: `docs/branch-hygiene.md`
- Order operations runbook: `docs/order-ops-runbook.md`

## Recommended Milestones

- Route stability (`/`, `/products`, `/products/[slug]`, `/cart`, policy routes).
- Metadata and sitemap consistency.
- Cart and checkout interaction stability.
- Payment operations reliability (webhook + order lookup + export).
- Quality gate (`pnpm build`, smoke tests, static checks).
- Release checkpoint (preview deploy + route checks).
