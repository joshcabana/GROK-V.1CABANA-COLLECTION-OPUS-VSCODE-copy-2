import Link from 'next/link'
import { shippingScopeLabel, supportEmailHref, sitePolicy } from '@/lib/policy'

export default function TermsPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Terms</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
          Last updated: 8 February 2026
        </p>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          These terms govern your use of the Cabana Collections website and purchases made through
          our store.
        </p>
        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">1. Orders and acceptance</h2>
            <p className="mt-2 text-[#6e6e73]">
              Placing an order is an offer to purchase. Orders are accepted when confirmed by us,
              subject to stock and payment verification.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">2. Pricing and payment</h2>
            <p className="mt-2 text-[#6e6e73]">
              Prices are listed in AUD and include GST where applicable. We can update pricing at
              any time before order acceptance.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">3. Shipping</h2>
            <p className="mt-2 text-[#6e6e73]">
              We currently ship {shippingScopeLabel()}. Timing estimates are not guaranteed and can
              vary based on carrier conditions.
            </p>
            <p className="mt-2 text-[#6e6e73]">
              See full details in the{' '}
              <Link href="/shipping-policy" className="underline hover:no-underline">
                Shipping Policy
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">4. Returns and Australian Consumer Law</h2>
            <p className="mt-2 text-[#6e6e73]">
              Our goods come with guarantees that cannot be excluded under Australian Consumer Law.
              You are entitled to statutory remedies for major failures.
            </p>
            <p className="mt-2 text-[#6e6e73]">
              See full details in the{' '}
              <Link href="/return-policy" className="underline hover:no-underline">
                Return Policy
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">5. Privacy</h2>
            <p className="mt-2 text-[#6e6e73]">
              We handle personal information in accordance with our{' '}
              <Link href="/privacy-policy" className="underline hover:no-underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">6. Contact</h2>
            <p className="mt-2 text-[#6e6e73]">
              For support, email{' '}
              <a href={supportEmailHref} className="underline hover:no-underline">
                {sitePolicy.supportEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
