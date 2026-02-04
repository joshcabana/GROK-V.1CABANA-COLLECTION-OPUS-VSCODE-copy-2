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
        <h2 className="font-heading text-2xl">Dispatch time</h2>
        <p className="text-sm text-black/60">
          Orders are processed within 1-2 business days. During peak periods or product launches,
          dispatch times may be longer. You will receive a confirmation email with tracking details.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Shipping rates</h2>
        <p className="text-sm text-black/60">
          Shipping costs are calculated at checkout based on your delivery location and order size.
          We occasionally offer free shipping promotions, which will be displayed during checkout.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Authority to Leave (ATL)</h2>
        <p className="text-sm text-black/60">
          If you select Authority to Leave, the carrier may leave the parcel in a safe location at
          your address. If you prefer a signature on delivery, select the signature option at
          checkout when available.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Address accuracy</h2>
        <p className="text-sm text-black/60">
          Please ensure your delivery details are correct. If a parcel is returned due to an
          incorrect address, we may charge a re-delivery fee.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">International shipping</h2>
        <p className="text-sm text-black/60">
          We currently ship within Australia. For international enquiries, please contact our team
          before ordering.
        </p>
      </div>

      <p className="text-sm text-black/60">
        Shipping questions? Email {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
