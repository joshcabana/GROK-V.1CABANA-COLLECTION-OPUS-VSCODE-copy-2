import { shippingScopeLabel, supportEmailHref, sitePolicy } from '@/lib/policy'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Privacy</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
          Last updated: 8 February 2026
        </p>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          Cabana Collections handles personal information in line with the Australian Privacy
          Principles. Our online store currently ships {shippingScopeLabel()}.
        </p>
        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">1. Information we collect</h2>
            <p className="mt-2 text-[#6e6e73]">
              We collect data you provide directly, including name, contact details, delivery
              address, order details, and support messages.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">2. How we use information</h2>
            <p className="mt-2 text-[#6e6e73]">
              We use personal information to operate the store, fulfil orders, provide support,
              prevent fraud, and improve site performance.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">3. Cookies and analytics</h2>
            <p className="mt-2 text-[#6e6e73]">
              Essential cookies may run for core functionality. Analytics tracking is disabled by
              default and only enabled if you grant consent.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">4. Marketing communications</h2>
            <p className="mt-2 text-[#6e6e73]">
              We send marketing updates only where permitted by law. You can unsubscribe at any
              time.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">5. Access and complaints</h2>
            <p className="mt-2 text-[#6e6e73]">
              You can request access or correction of your information. For unresolved issues, you
              may escalate to the Office of the Australian Information Commissioner.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">6. Contact</h2>
            <p className="mt-2 text-[#6e6e73]">
              Email:{' '}
              <a href={supportEmailHref} className="underline hover:no-underline">
                {sitePolicy.supportEmail}
              </a>
              <br />
              Address: Canberra ACT 2601, Australia
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
