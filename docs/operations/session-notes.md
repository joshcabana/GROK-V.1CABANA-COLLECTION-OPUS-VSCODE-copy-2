# CABANA Session Notes

## 2026-02-09 07:31 AEDT

### Current State
- Branch: `Cabana-Collections-2026`
- Working tree: clean
- Active app: Next.js App Router (`/app`)
- Release hardening changes are present:
  - `.gitignore` expanded for temp/artifact hygiene
  - `scripts/build-html.cjs` deprecated (fails fast intentionally)
  - `scripts/perf-dashboard.cjs` compares Lighthouse baselines by route path
  - `scripts/print-lhci-opportunities.cjs` targets App Router PDP path

### Most Recent Verified Checks
- `npm run build` passed
- `pnpm run test:e2e` passed (`34 passed`, `4 skipped`)
- `pnpm run lhci:mobile` passed assertions
- `pnpm run lhci:desktop` passed assertions
- `pnpm run verify:release` passed end-to-end
- Local route checks returned `200` for:
  - `/`
  - `/products`
  - `/products/mens-boxer-brief-black`
  - `/cart`
  - `/privacy`
  - `/terms`
- Homepage fallback marker check (`Image+Unavailable`): `0`

### Known Notes
- Mobile Lighthouse deltas are now correctly computed and can fail if baseline regression exceeds threshold.
- This is expected behavior after fixing route-key baseline matching.

### Ongoing Operating Rule
- Use this release gate sequence before preview deploy:
  1. `pnpm run verify:assets`
  2. `pnpm run verify:build`
  3. `pnpm run test:e2e`
  4. `pnpm run lhci:mobile`
  5. `pnpm run lhci:desktop`
  6. `pnpm run deploy:preview`

## 2026-02-09 07:32 AEDT

### Additional Autonomous Verification
- `pnpm run inspect:live` passed
  - Output: `reports/releases/live-inspection.latest.md`
- `pnpm run inspect:visual` passed
  - Output: `reports/releases/visual-inspection.latest.md`

### Interpretation
- Latest known preview remains healthy across inspected routes.
- No immediate blockers identified.

## 09/02/2026, 07:34:12 AEDT

### Automated Checkpoint
- Branch: `Cabana-Collections-2026`
- HEAD: `3a5b955 Audit repo cleanliness and stability`
- Working tree: `M package.json | ?? docs/operations/session-notes.md | ?? scripts/session-checkpoint.cjs`
- Latest preview URL: https://skill-deploy-ej086cfulk-codex-agent-deploys.vercel.app
- Live inspection report present: yes
- Visual inspection report present: yes

### Next Safe Action
- Run `pnpm run verify:release` before any deploy and update this checkpoint afterward.

## 09/02/2026, 08:07:22 AEDT

### Automated Checkpoint
- Branch: `Cabana-Collections-2026`
- HEAD: `484b54b chore(perf): refresh lhci baselines and dashboards`
- Working tree: `M reports/lighthouse/dashboard.desktop.md |  M reports/lighthouse/dashboard.mobile.md`
- Latest preview URL: https://skill-deploy-4wy9xgy94s-codex-agent-deploys.vercel.app
- Live inspection report present: yes
- Visual inspection report present: yes

### Next Safe Action
- Run `pnpm run verify:release` before any deploy and update this checkpoint afterward.

## 09/02/2026, 16:06:53 AEDT

### Automated Checkpoint
- Branch: `Cabana-Collections-2026`
- HEAD: `df569a2 chore(ops): checkpoint release verification and inspections`
- Working tree: `M .vercelignore |  M app/cart/page.tsx |  M app/globals.css |  M app/page.tsx |  M app/products/[slug]/ProductDetail.tsx |  M app/products/page.tsx |  M components/AddToCartButton.tsx |  M components/Footer.tsx |  M components/Header.tsx |  M components/ProductCard.tsx |  M components/ProductImageGallery.tsx |  M components/ServiceWorkerRegister.tsx |  M package.json |  M public/assets/Images/optimised/boxers-back.jpg |  M public/assets/Images/optimised/boxers-front.jpg |  M reports/lighthouse/dashboard.desktop.md |  M reports/lighthouse/dashboard.mobile.md |  M scripts/deploy.sh | ?? public/assets/Images/CABANA-BOXERS-360-opt.mp4 | ?? public/assets/Images/CABANA-BOXERS-360-opt.webm | ?? public/assets/Images/Discover-360-opt.mp4 | ?? public/assets/Images/Discover-360-opt.webm | ?? public/assets/Images/Women-360-opt.mp4 | ?? public/assets/Images/Women-360-opt.webm`
- Latest preview URL: https://skill-deploy-ardjr14x6p-codex-agent-deploys.vercel.app
- Live inspection report present: yes
- Visual inspection report present: yes

### Next Safe Action
- Run `pnpm run verify:release` before any deploy and update this checkpoint afterward.

## 10/02/2026, 16:07:21 AEDT

### Automated Checkpoint
- Branch: `Cabana-Collections-2026`
- HEAD: `b512603 Audit performance regressions`
- Working tree: `M lighthouserc.cjs |  M reports/lighthouse/dashboard.desktop.md |  M reports/lighthouse/dashboard.mobile.md`
- Latest preview URL: https://skill-deploy-mcnedlsl7i-codex-agent-deploys.vercel.app
- Live inspection report present: yes
- Visual inspection report present: yes

### Next Safe Action
- Run `pnpm run verify:release` before any deploy and update this checkpoint afterward.
