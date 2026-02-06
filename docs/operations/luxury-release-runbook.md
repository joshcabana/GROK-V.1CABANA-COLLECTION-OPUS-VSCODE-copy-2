# CABANA Luxury Release Runbook

## Objective

Keep CABANA release quality predictable while preserving premium desktop/mobile experience, strong accessibility, and stable commerce behavior.

## Required Gate Before Any Preview Ship

Run in this exact order:

1. `pnpm run verify:assets`
2. `pnpm run verify:build`
3. `pnpm run test:e2e`
4. `pnpm run lhci:mobile`
5. `pnpm run lhci:desktop`
6. `pnpm run deploy:preview`

Release is blocked if any step fails.

## Twice-Weekly Live Inspection Cadence

Perform this manual pass twice weekly (for example Tuesday and Friday), on:

1. Latest preview URL
2. Latest promoted URL

### Command

Use the latest preview from `reports/releases/latest.json` and include promoted URL:

```bash
CABANA_PROMOTED_URL="https://your-promoted-url.vercel.app" pnpm run inspect:live
```

Or run against explicit URLs:

```bash
node scripts/live-inspection.cjs https://preview-url.vercel.app https://promoted-url.vercel.app
```

The command writes:

1. `reports/releases/live-inspection.latest.json`
2. `reports/releases/live-inspection.latest.md`

## Visual Acceptance Checklist

Verify on desktop (`1280px`, `1440px`) and mobile (`~390x844`) for `/`, `/products`, `/products/[slug]`, `/cart`:

1. No broken media and no fallback placeholder (`Image+Unavailable`)
2. Consistent typography hierarchy (`font-heading` + `font-body`)
3. Clean spacing rhythm and container alignment
4. Motion feels restrained and premium (no abrupt transitions)
5. Reduced-motion behavior is respected
6. Focus visibility and keyboard traversal remain intact
7. No horizontal overflow

## Defect Handling Discipline

Severity:

1. `P0`: purchase flow breaks, image failures, inaccessible critical interactions
2. `P1`: visual fidelity/performance regressions
3. `P2`: minor polish

Rules:

1. Fix only affected files
2. Add/adjust Playwright coverage in `tests/app-router.spec.ts` for the bug class
3. Re-run `pnpm run verify:release`
4. Re-run `pnpm run deploy:preview` for UI/media/deploy changes
