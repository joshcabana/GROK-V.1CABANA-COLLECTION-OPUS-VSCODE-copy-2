import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'CABANA delivery timeframes, costs, and Authority to Leave options.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Shipping Policy</p>
      <h1 className="font-heading text-4xl">Delivery with care.</h1>
      <p className="text-sm text-black/60">Last updated: 4 February 2026</p>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Australia-wide delivery</h2>
        <p className="text-sm text-black/60">
          Orders dispatch within 1-3 business days from the ACT. We ship with Australia Post and
          comparable couriers, including delivery to PO Boxes and Parcel Lockers.
        </p>
        <p className="text-sm text-black/60">
          Free standard shipping applies to orders $150+ (after discounts). Otherwise, shipping is
          calculated at checkout based on weight and destination.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Authority to Leave (ATL)</h2>
        <p className="text-sm text-black/60">
          You can select signature on delivery or ATL at checkout. If ATL is chosen, delivery is
          deemed complete when the carrier scans the parcel at the address.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Risk, title & delays</h2>
        <p className="text-sm text-black/60">
          Title passes when payment is received in full. Risk passes on delivery to your nominated
          address (including ATL). Estimated timeframes may vary due to carrier or external events.
        </p>
      </div>

      <p className="text-sm text-black/60">
        Shipping questions? Email {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
