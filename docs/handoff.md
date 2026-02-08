# CABANA Handoff

## Product Vision (Do Not Drift)
- Premium, minimalist CABANA e-commerce experience with quiet luxury aesthetics.
- Preserve local photos as primary media source.
- Mobile-first performance and accessibility as release gates.
- Reliable cart flow and polished PDP interactions.

## Current State Snapshot
- Date: 2026-02-09 10:21:46 AEDT
- Branch: grok
- Latest commit: d966255 Summarize CABANA Collections project
- Build status (`pnpm build`): PASS
- LHCI status (mobile/desktop): PASS for all budgets (`performance >= 0.90`, `accessibility >= 0.95`, `SEO >= 0.90`, `best-practices >= 0.90`)
- Latest preview URL: https://skill-deploy-86skndwb5b-codex-agent-deploys.vercel.app
- Latest claim URL: https://vercel.com/claim-deployment?code=d3d0ed3c-afd6-4e4b-a2e4-ded543916d01
- Preview route smoke (`curl`): PASS (`200`) for `/`, `/products`, `/products/mens-boxer-brief-black`, `/products/womens-modal-set`, `/products/signature-starter-set`, `/cart`, `/privacy`, `/terms`, `/legal`
- Preview media smoke (`curl`): PASS (`200`) for `/assets/Images/CABANA-BOXERS-360-opt.{webm,mp4}`, `/assets/Images/Women-360-opt.{webm,mp4}`, `/assets/Images/Discover-360-opt.{webm,mp4}`

## Active Milestone
- Name: Ship current media/perf deploy candidate
- Scope: Ship `webm+mp4` PDP 360 media, tighten deploy packaging (`600k` guardrail + `.vercelignore` integration), refresh LHCI dashboards, and publish a claimable preview
- Entry criteria: Product media contract updated and optimized media artifacts available in `public/assets/Images`
- Exit criteria: `pnpm build`, `pnpm test:smoke`, and `pnpm run lhci:mobile && pnpm run lhci:desktop` pass; preview routes and optimized media return `200`; checkpoint saved
- Risks: Vercel preview can return temporary `404` during build warmup before becoming fully ready

## Milestone Log
| Date | Milestone | What Changed | Validation | Open Risks | Owner |
|---|---|---|---|---|---|
| 2026-02-06 | Final QA rerun | Re-ran route smoke and verified deployed preview endpoints | `curl` returned 200 on `/`, `/products`, `/products/mens-boxer-brief-black`, `/cart`, `/privacy`, `/terms` | None observed during this pass | Codex |
| 2026-02-06 | Budget gate stabilized | Updated LHCI scripts to read from `.lighthouseci` directly, removed brittle `/tmp` dependency in npm scripts | `pnpm run lhci:all:baseline` PASS, `pnpm run lhci:all:dashboard` PASS | Upload endpoint intermittently fails in restricted DNS but assertions still run locally | Codex |
| 2026-02-06 | Preview handoff | Deployed latest verified build with local images and Gucci-style logo morph preserved | Preview URL + claim URL returned, local route smoke 200 on `/`, `/products`, `/products/[slug]`, `/cart`, `/privacy`, `/terms` | DNS variability may still occur on restricted networks | Codex |
| 2026-02-06 | Live preview confirmation | Verified deployed routes directly against Vercel preview host | `curl` returned 200 on `/`, `/products`, `/products/mens-boxer-brief-black`, `/cart`, `/privacy`, `/terms` | None observed during this pass | Codex |
| 2026-02-09 | Media/perf deploy candidate | Added dual-source PDP 360 media (`webm` preferred, `mp4` fallback), tightened deploy packaging with `.vercelignore` + `600k` cap, refreshed LHCI dashboards, and deployed preview | `pnpm build` PASS, `pnpm test:smoke` PASS, `pnpm run lhci:mobile && pnpm run lhci:desktop` PASS, preview routes/media `curl` checks PASS | Preview host may return transient 404 until build reaches ready state | Codex |

## Next 3 Actions
1. Claim deployment URL into Vercel project ownership.
2. Browser-check the latest preview for PDP media toggle behavior on Chrome + Safari.
3. Merge milestone commit and monitor first post-merge deploy logs for package size regressions.

## Blockers
- None.

## Notes
- Local image assets remain in `public/assets/Images`; product data currently references local paths.
- Gucci-style morph-and-slide logo animation is active between hero logo and top nav.
- PDP 360 media contract now uses `webm` with `mp4` fallback in `app/products/[slug]/ProductDetail.tsx`.
