# CABANA Media/Perf Deploy Candidate

Date: 2026-02-09 10:21 AEDT  
Branch: `grok`

## Release Scope

- Updated PDP 360 media contract to dual-format sources (`webm` preferred, `mp4` fallback) in `app/products/[slug]/ProductDetail.tsx`.
- Preserved header/nav animation behavior while keeping mobile menu and cart interactions stable in `components/Header.tsx`.
- Tightened deployment packaging:
  - integrated `.vercelignore` into `scripts/deploy.sh`
  - lowered default `CABANA_DEPLOY_MAX_SIZE` to `600k`
  - kept optimized `mp4` files in deploy payload for fallback support
- Refreshed Lighthouse dashboards:
  - `reports/lighthouse/dashboard.mobile.md`
  - `reports/lighthouse/dashboard.desktop.md`

## Deployment

- Preview URL: https://skill-deploy-86skndwb5b-codex-agent-deploys.vercel.app
- Claim URL: https://vercel.com/claim-deployment?code=d3d0ed3c-afd6-4e4b-a2e4-ded543916d01
- Deployment ID: `dpl_124P4QY2YFV1DFww8Li8MrTeQmoj`
- Project ID: `prj_cuQ1jTdEfJCZsqxffBFUw3CrlI27`

## Validation Summary

- Build: `pnpm build` -> PASS
- Smoke suite: `pnpm test:smoke` -> PASS
- LHCI: `pnpm run lhci:mobile && pnpm run lhci:desktop` -> PASS
- Preview route smoke (`curl`): `200` for:
  - `/`
  - `/products`
  - `/products/mens-boxer-brief-black`
  - `/products/womens-modal-set`
  - `/products/signature-starter-set`
  - `/cart`
  - `/privacy`
  - `/terms`
  - `/legal`
- Preview media smoke (`curl`): `200` for:
  - `/assets/Images/CABANA-BOXERS-360-opt.webm`
  - `/assets/Images/CABANA-BOXERS-360-opt.mp4`
  - `/assets/Images/Women-360-opt.webm`
  - `/assets/Images/Women-360-opt.mp4`
  - `/assets/Images/Discover-360-opt.webm`
  - `/assets/Images/Discover-360-opt.mp4`

## Manual Media QA

- Chromium + WebKit playback checks confirmed `webm` source selection on all three PDP routes.
- Fallback test with `webm` blocked confirmed `mp4` playback for all three PDP routes.
