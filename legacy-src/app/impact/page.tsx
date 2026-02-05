import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact',
  description: 'See how CABANA dedicates 15% of every purchase to meaningful impact in Australia.',
};

const stats = [
  { label: 'Total donated', value: '$12,450', note: 'Since January 2025' },
  { label: 'Lives impacted', value: '2,490', note: 'Through partner organisations' },
  { label: 'Of every purchase', value: '15%', note: 'Automatically donated' },
];

export default function ImpactPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="mx-auto max-w-4xl space-y-6 px-4 pt-12 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Impact</p>
        <h1 className="font-heading text-4xl md:text-5xl">Purpose in every thread.</h1>
        <p className="text-base text-black/60">
          Every CABANA purchase creates positive impact. We automatically donate 15% of proceeds to
          initiatives supporting mental health and women’s empowerment.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-3 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="section-card p-6 text-center">
            <p className="text-3xl font-heading text-gold">{stat.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-black/50">{stat.label}</p>
            <p className="mt-2 text-sm text-black/60">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 md:px-8">
        <h2 className="text-center font-heading text-3xl md:text-4xl">How it works</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="section-card p-6">
            <h3 className="font-heading text-2xl">Men’s collection</h3>
            <p className="mt-3 text-sm text-black/60">
              15% of every men’s purchase supports mental health initiatives, breaking stigmas and
              providing accessible resources.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li><strong>Current partner:</strong> Beyond Blue</li>
              <li><strong>Impact:</strong> $7,230 donated</li>
              <li><strong>Focus:</strong> Mental health support & awareness</li>
            </ul>
          </div>
          <div className="section-card p-6">
            <h3 className="font-heading text-2xl">Women’s collection</h3>
            <p className="mt-3 text-sm text-black/60">
              15% of every women’s purchase empowers women through education, leadership, and
              economic opportunity.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li><strong>Current partner:</strong> UN Women Australia</li>
              <li><strong>Impact:</strong> $5,220 donated</li>
              <li><strong>Focus:</strong> Economic empowerment & equality</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-4 md:px-8">
        <h2 className="font-heading text-3xl">Transparency and reporting</h2>
        <p className="text-sm text-black/60">
          We share quarterly impact updates with our community. These reports outline donation
          totals, partner outcomes, and the initiatives supported by the CABANA community.
        </p>
        <p className="text-sm text-black/60">
          Want to receive the next impact report? Join our newsletter on the homepage.
        </p>
      </section>
    </div>
  );
}
