import type { Metadata } from 'next';
import { shippingScopeLabel, supportEmailHref, sitePolicy } from '@/lib/policy';

export const metadata: Metadata = {
  title: 'Shipping Policy — Cabana Collections',
  description:
    'Cabana Collections shipping information, delivery times, and order tracking details.',
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Shipping</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Shipping Policy
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
          Last updated: 8 February 2026
        </p>

        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">Coverage</h2>
            <p className="mt-2 text-[#6e6e73]">We currently deliver {shippingScopeLabel()}.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Dispatch and delivery windows</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[#6e6e73]">
              <li>Dispatch target: 1 to 3 business days.</li>
              <li>Standard shipping: 3 to 7 business days after dispatch.</li>
              <li>Express shipping: 1 to 3 business days after dispatch.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-medium">Costs</h2>
            <p className="mt-2 text-[#6e6e73]">
              Shipping fees are shown at checkout based on destination and order size.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Support</h2>
            <p className="mt-2 text-[#6e6e73]">
              Questions about shipping can be sent to{' '}
              <a href={supportEmailHref} className="underline hover:no-underline">
                {sitePolicy.supportEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
