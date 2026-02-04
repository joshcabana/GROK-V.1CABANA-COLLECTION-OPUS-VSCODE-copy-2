import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about CABANA, our design philosophy, and commitment to conscious essentials.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">About CABANA</p>
      <h1 className="font-heading text-4xl">Minimal essentials, meaningful impact.</h1>
      <p className="text-base text-black/60">
        CABANA is an Australian underwear brand grounded in subtle luxury, comfort-first design, and
        responsible production. We create timeless pieces crafted from breathable modal blends and
        focus on quality that lasts beyond seasons.
      </p>
      <div className="section-card p-6">
        <h2 className="font-heading text-2xl">Our promise</h2>
        <ul className="mt-3 space-y-2 text-sm text-black/60">
          <li>Design-led essentials that feel effortless every day.</li>
          <li>Responsible sourcing and transparent material choices.</li>
          <li>15% of every purchase committed to mental health and women’s empowerment.</li>
        </ul>
      </div>
    </div>
  );
}
