import { supportEmailHref, sitePolicy } from '@/lib/policy'

export default function ReturnsPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Returns</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Return Policy
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
          Last updated: 8 February 2026
        </p>

        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">Return window</h2>
            <p className="mt-2 text-[#6e6e73]">
              Eligible items can be returned within 30 days of delivery, subject to hygiene and
              condition requirements.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Eligibility</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[#6e6e73]">
              <li>Items must be unworn, unwashed, and in original condition.</li>
              <li>Original tags and packaging must be included.</li>
              <li>Final sale items are not returnable unless required by law.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-medium">How to start a return</h2>
            <p className="mt-2 text-[#6e6e73]">
              Email{' '}
              <a href={supportEmailHref} className="underline hover:no-underline">
                {sitePolicy.supportEmail}
              </a>{' '}
              with your order number and reason for return.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Consumer guarantees</h2>
            <p className="mt-2 text-[#6e6e73]">
              Nothing in this policy limits rights available under Australian Consumer Law.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
