# Milestone Checklist

Use this at every meaningful checkpoint.

## Definition
A milestone is complete when one significant slice of the product is functional and recoverable.

## Required Steps
1. Run `pnpm run checkpoint`.
2. Run `pnpm run checkpoint:save`.
3. Append/update `docs/handoff.md`.
4. Run targeted validation for the slice (build, route smoke, or LHCI).
5. Commit with `milestone: <name>`.

## Recommended Milestones
- Route stability (`/`, `/products`, `/products/[slug]`, `/cart`, `/privacy`, `/terms`).
- Media stability (local images + fallback + CLS control).
- Cart interactions (drawer, add-to-cart, persistence, focus trap).
- Motion polish (logo morph + reduced-motion compliance).
- Quality gate (LHCI mobile + desktop).
- Release checkpoint (preview deploy + smoke pass).
