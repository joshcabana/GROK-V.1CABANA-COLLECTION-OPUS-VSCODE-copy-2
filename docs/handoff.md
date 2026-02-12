# CABANA Handoff

## Product Vision (Do Not Drift)

- Premium, minimalist CABANA e-commerce experience with quiet luxury aesthetics.
- Preserve local photos as primary media source.
- Mobile-first performance and accessibility as release gates.
- Reliable cart flow and polished PDP interactions.

## Current State Snapshot

- Date: 2026-02-12 16:41:39 AEDT
- Branch: codex/next-parity-followup-grok
- Latest commit: 0a177f6 Handle localStorage failures
- Build status (`pnpm build`): PASS
- Smoke status (`PLAYWRIGHT_SKIP_WEBSERVER=1 PLAYWRIGHT_BASE_URL=<preview> pnpm run test:smoke`): PASS (`73/73`)
- LHCI status (mobile/desktop): Not rerun in this pass (last recorded PASS in prior checkpoints)
- Latest preview URL: https://skill-deploy-63bmk0evwq-codex-agent-deploys.vercel.app
- Latest claim URL: https://vercel.com/claim-deployment?code=07cac1fc-e415-4d34-ba57-d1d5a569e8a9
- Latest deployment ID: dpl_H4y6RD5HZdtQ1mEBN7R7qftyoTLx
- Latest project ID: prj_YRQYTERrwwayCXUM5wAD4Yqn9cpP
- Claim status: Pending user login (claim URL redirects to Vercel auth in this environment)
- Preview route smoke (`curl -Ls`): PASS (`200`) for `/`, `/products`, `/products/mens-boxer-brief-black`, `/products/womens-modal-set`, `/products/signature-starter-set`, `/cart`, `/privacy`, `/terms`, `/legal`
- Preview media smoke (`curl`): PASS (`200`) for `/assets/Images/CABANA-BOXERS-360-opt.{webm,mp4}`, `/assets/Images/Women-360-opt.{webm,mp4}`, `/assets/Images/Discover-360-opt.{webm,mp4}`

## Active Milestone

- Name: PDP fix & parity close-out
- Scope: Delete legacy product HTML files causing PDP routing conflicts, close all four Next.js parity backlog items, verify with smoke tests
- Entry criteria: Previous deploy confirmed PDP regression on `/products/mens-boxer-brief-black` and `/products/womens-set`
- Exit criteria: `pnpm build` + `pnpm run test:smoke` pass; all parity backlog items marked done
- Risks: claim flow still needs authenticated Vercel session for final deployment

## Milestone Log

| Date       | Milestone                            | What Changed                                                                                                                                                                      | Validation                                                                                                                               | Open Risks                                                                                                                                                          | Owner |
| ---------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 2026-02-06 | Final QA rerun                       | Re-ran route smoke and verified deployed preview endpoints                                                                                                                        | `curl` returned 200 on `/`, `/products`, `/products/mens-boxer-brief-black`, `/cart`, `/privacy`, `/terms`                               | None observed during this pass                                                                                                                                      | Codex |
| 2026-02-06 | Budget gate stabilized               | Updated LHCI scripts to read from `.lighthouseci` directly, removed brittle `/tmp` dependency in npm scripts                                                                      | `pnpm run lhci:all:baseline` PASS, `pnpm run lhci:all:dashboard` PASS                                                                    | Upload endpoint intermittently fails in restricted DNS but assertions still run locally                                                                             | Codex |
| 2026-02-06 | Preview handoff                      | Deployed latest verified build with local images and Gucci-style logo morph preserved                                                                                             | Preview URL + claim URL returned, local route smoke 200 on `/`, `/products`, `/products/[slug]`, `/cart`, `/privacy`, `/terms`           | DNS variability may still occur on restricted networks                                                                                                              | Codex |
| 2026-02-06 | Live preview confirmation            | Verified deployed routes directly against Vercel preview host                                                                                                                     | `curl` returned 200 on `/`, `/products`, `/products/mens-boxer-brief-black`, `/cart`, `/privacy`, `/terms`                               | None observed during this pass                                                                                                                                      | Codex |
| 2026-02-09 | Media/perf deploy candidate          | Added dual-source PDP 360 media (`webm` preferred, `mp4` fallback), tightened deploy packaging with `.vercelignore` + `600k` cap, refreshed LHCI dashboards, and deployed preview | `pnpm build` PASS, `pnpm test:smoke` PASS, `pnpm run lhci:mobile && pnpm run lhci:desktop` PASS, preview routes/media `curl` checks PASS | Preview host may return transient 404 until build reaches ready state                                                                                               | Codex |
| 2026-02-12 | Fresh claimable deploy + quick smoke | Deployed fresh preview (`dpl_H4y6RD5HZdtQ1mEBN7R7qftyoTLx`), polled readiness to 200, reran Playwright smoke, validated route/media HTTP checks, and saved checkpoint             | `pnpm build` PASS, `pnpm run test:smoke` PASS (`73/73`), route/media `curl -Ls` checks PASS                                              | Claim blocked pending Vercel login; `vercel.json` rewrite behavior causes `/products/mens-boxer-brief-black` and `/products/womens-set` to show "Product not found" | Codex |

## Next 3 Actions

1. Complete deployment claim in an authenticated Vercel browser session using: https://vercel.com/claim-deployment?code=07cac1fc-e415-4d34-ba57-d1d5a569e8a9
2. Redeploy after PDP fix (deleted static product HTML files) and verify PDP routes render correctly in preview.
3. Re-run Chrome + Safari PDP 360 QA on mens/womens/signature routes after redeploy.

## Blockers

- Claim confirmation cannot be completed in this environment without a logged-in Vercel session.

## Notes

- Local image assets remain in `public/assets/Images`; product data currently references local paths.
- Gucci-style morph-and-slide logo animation is active between hero logo and top nav.
- PDP 360 media contract now uses `webm` with `mp4` fallback in `app/products/[slug]/ProductDetail.tsx`.
- Browser media verification results this pass:
  - Chromium: `signature-starter-set` selects `.webm` by default and falls back to `.mp4` when `.webm` is blocked.
  - WebKit: `signature-starter-set` selects `.webm` by default; fallback could not be conclusively verified with interception in this environment.
