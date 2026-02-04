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
        <h2 className="font-heading text-2xl">Australian Consumer Law</h2>
        <p className="text-sm text-black/60">
          Our goods come with guarantees that cannot be excluded under the Australian Consumer Law.
          You are entitled to a replacement or refund for a major failure and to compensation for
          any other reasonably foreseeable loss or damage.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Change-of-mind returns</h2>
        <p className="text-sm text-black/60">
          We accept change-of-mind returns within 14 days of delivery for unworn, unwashed items with
          original packaging. For hygiene reasons, underwear must be tried on over your own garments
          and returned in unused condition. Change-of-mind returns are offered in addition to your
          ACL rights.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Faulty or incorrect items</h2>
        <p className="text-sm text-black/60">
          If an item arrives faulty or incorrect, contact us within 7 days. We will provide a repair,
          replacement, or refund depending on the issue, in line with ACL rights.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">How to lodge a return</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Email our support team with your order number and reason for return.</li>
          <li>We will respond with return instructions and a return address.</li>
          <li>Once received and inspected, refunds are processed within 5 business days.</li>
        </ul>
      </div>

      <p className="text-sm text-black/60">
        Returns support: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
