import { impactPercentLabel, sitePolicy } from '@/lib/policy'

export default function ImpactPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Impact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          The {impactPercentLabel()} Promise
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          CABANA allocates {impactPercentLabel()} of each purchase to social-impact initiatives. The
          allocation is tied to the product category to keep reporting clear and predictable.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Men&apos;s products</p>
            <p className="mt-2 text-sm text-[#1d1d1f]">
              {impactPercentLabel()} supports {sitePolicy.impactAllocation.mens}.
            </p>
          </article>
          <article className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Women&apos;s products</p>
            <p className="mt-2 text-sm text-[#1d1d1f]">
              {impactPercentLabel()} supports {sitePolicy.impactAllocation.womens}.
            </p>
          </article>
          <article className="rounded-2xl border border-[#d2d2d7] bg-white p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Bundles</p>
            <p className="mt-2 text-sm text-[#1d1d1f]">
              {impactPercentLabel()} is distributed as a {sitePolicy.impactAllocation.bundle}.
            </p>
          </article>
        </div>

        <section className="mt-8 rounded-2xl border border-[#d2d2d7] bg-white p-5">
          <h2 className="text-lg font-medium text-[#1d1d1f]">Reporting commitment</h2>
          <p className="mt-2 text-sm text-[#6e6e73]">
            Allocation logic is fixed in our policy model and reflected across product, legal, and
            customer-support surfaces to avoid conflicting claims.
          </p>
        </section>
      </div>
    </main>
  )
}
