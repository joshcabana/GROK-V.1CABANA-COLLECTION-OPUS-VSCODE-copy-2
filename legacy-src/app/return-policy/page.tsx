import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns Policy',
  description: 'CABANA returns, refunds, and Australian Consumer Law remedies.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Returns Policy</p>
      <h1 className="font-heading text-4xl">Returns and refunds.</h1>
      <p className="text-sm text-black/60">Last updated: 4 February 2026</p>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">30-day return guarantee</h2>
        <p className="text-sm text-black/60">
          We offer a 30-day return period from the date you receive your order. Items must be
          unworn, unwashed, and returned with original tags and packaging where applicable.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/60">
          <li>Items must be free from odors, stains, or damage.</li>
          <li>Underwear should be tried on over your own garments.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Australian Consumer Law rights</h2>
        <p className="text-sm text-black/60">
          Our goods come with guarantees that cannot be excluded under the Australian Consumer Law.
          You are entitled to a replacement or refund for a major failure and compensation for any
          other reasonably foreseeable loss or damage.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">How to return</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-black/60">
          <li>Email us with your order number and reason for return.</li>
          <li>We will send return instructions and a prepaid label where applicable.</li>
          <li>Pack items securely and drop off at your nearest Australia Post location.</li>
        </ol>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Refund process</h2>
        <p className="text-sm text-black/60">
          Returns are inspected within 2 business days of arrival. Approved refunds are processed to
          the original payment method within 5-7 business days.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Exchanges</h2>
        <p className="text-sm text-black/60">
          We offer exchanges for size changes subject to availability. Follow the same return
          process and include the preferred size.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Non-returnable items</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/60">
          <li>Items that have been worn or washed.</li>
          <li>Items without original tags.</li>
          <li>Items marked as final sale.</li>
          <li>Gift cards.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Damaged or defective items</h2>
        <p className="text-sm text-black/60">
          If your item arrives damaged or incorrect, contact us immediately with photos. We will
          organise a replacement or full refund, including shipping costs.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">International returns</h2>
        <p className="text-sm text-black/60">
          We currently ship within Australia. If you have an international order, please contact us
          for tailored return instructions.
        </p>
      </div>

      <p className="text-sm text-black/60">
        Returns support: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
