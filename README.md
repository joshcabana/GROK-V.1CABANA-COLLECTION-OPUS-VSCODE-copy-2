# CABANA Storefront

CABANA is a premium sustainable modal underwear storefront built on Next.js with a minimalist, quiet-luxury visual direction and an Australia-first policy model.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Zustand (cart state)
- Stripe Hosted Checkout (server-side session creation)
- Stripe webhook + Postgres order persistence
- Resend transactional email integration
- Playwright smoke and API flow checks

## Repository Structure

- `app/`: pages, routes, API endpoints
- `components/`: shared UI components
- `lib/`: utilities, store, policy, env/db/email helpers
- `public/`: static assets, PWA files, canonical SEO files
- `scripts/`: checks, deploy helper, perf scripts, SQL migrations
- `tests/`: Playwright smoke + payment API tests
- `docs/`: handoff, checkpoints, release notes, operational docs

## Branch Policy

Primary active lineage:

- `codex/next-parity-followup-grok`
- `codex/repo-hygiene-pass-1` (repository hygiene wave)

Branch hygiene snapshot:

- See `docs/branch-hygiene.md`

## Environment Variables

Copy from `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `ORDER_FROM_EMAIL`
- `ADMIN_EXPORT_TOKEN`

## Development

```bash
pnpm install
pnpm dev
```

## Validation Commands

```bash
pnpm build
pnpm run test:smoke
pnpm run test:payments
pnpm run check:static
```

## Deployment

Claimable preview deploy helper:

```bash
bash scripts/deploy.sh .
```

Outputs preview URL + claim URL + deployment IDs.

## Docs Map

- Current handoff: `docs/handoff.md`
- Order operations runbook: `docs/order-ops-runbook.md`
- Repository hygiene audit: `docs/repo-hygiene-audit.md`
- Branch hygiene status: `docs/branch-hygiene.md`
- Milestone process: `docs/milestone-checklist.md`
