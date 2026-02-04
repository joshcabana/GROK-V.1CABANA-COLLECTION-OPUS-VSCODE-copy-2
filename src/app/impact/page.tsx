import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact',
  description: 'See how CABANA contributes 15% of every purchase to impact initiatives.',
};

export default function ImpactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Impact</p>
      <h1 className="font-heading text-4xl">15% dedicated to impact.</h1>
      <p className="text-base text-black/60">
        CABANA reinvests 15% of every purchase into organisations supporting mental health and
        women&rsquo;s empowerment across Australia. We share quarterly updates with our community and
        partner with initiatives that align with our values.
      </p>
      <div className="section-card p-6">
        <h2 className="font-heading text-2xl">How we give</h2>
        <ul className="mt-3 space-y-2 text-sm text-black/60">
          <li>Funding for grassroots mental health programs.</li>
          <li>Support for women-led education and economic empowerment initiatives.</li>
          <li>Transparency reports shared with our newsletter subscribers.</li>
        </ul>
      </div>
    </div>
  );
}
