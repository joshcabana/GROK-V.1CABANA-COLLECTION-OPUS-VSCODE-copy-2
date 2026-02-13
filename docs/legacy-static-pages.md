# Legacy Static Pages (Frozen)

## Status

- Legacy root/static HTML pages are frozen and no longer canonical runtime surfaces.
- Canonical routes are now served by Next.js App Router under `app/`.

## Redirect Ownership

- Redirect rules are defined in `next.config.js`.
- Any addition/removal of legacy mappings must be updated there and covered by `tests/redirects.spec.ts`.

## Frozen Legacy Entry Points

- `/index.html`
- `/about.html`
- `/impact.html`
- `/contact.html`
- `/privacy-policy.html`
- `/terms-of-service.html`
- `/shipping-policy.html`
- `/return-policy.html`
- `/size-guide.html`
- `/care-instructions.html`
- `/legal/index.html`
- `/cart.html`
- `/products/mens-underwear.html`
- `/products/mens-boxer-brief-black.html`
- `/products/womens-set.html`
- `/faq.html`

## Deletion Plan

- Keep legacy files in-repo for one release cycle while redirect telemetry and smoke tests remain stable.
- Remove frozen files in a dedicated cleanup PR after confirming no unresolved dependencies.
- ✅ **Deleted 2026-02-13:** `mens-boxer-brief-black.html`, `mens-underwear.html`, `womens-set.html` (superseded by Next.js `[slug]` route; caused PDP routing conflicts on Vercel preview).
