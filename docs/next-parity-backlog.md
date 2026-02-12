# Next.js Parity Backlog

Static HTML is currently the production surface. Track these follow-up parity tasks for the Next.js app:

1. ~~Update `/app/privacy/page.tsx` contact details to `support@cabanacollections.com.au` and align legal metadata with static policy pages.~~ ✅ Done — `lib/policy.ts` drives `supportEmail` across all pages.
2. ~~Update `/app/terms/page.tsx` so Terms copy, date, and AU-only shipping language match `/terms-of-service.html`.~~ ✅ Done — date is "8 February 2026", `shippingScopeLabel()` returns "Australia only".
3. ~~Replace the footer ABN placeholder in `/components/Footer.tsx` with the production ABN (`91302503433`) and confirm legal links match static routes.~~ ✅ Done — Footer shows `ABN: 91 302 503 433`.
4. ~~Align impact messaging and give-back percentage in the Next product surface with static production (`10%`, category-specific messaging).~~ ✅ Done — `sitePolicy.impactPercent: 10` used across impact and PDP pages.

> All items verified 2026-02-13.
