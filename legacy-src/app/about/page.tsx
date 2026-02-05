import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Discover CABANA’s philosophy of conscious craft and the story behind our sustainable essentials.',
};

const values = [
  {
    title: 'Conscious Craft',
    description:
      'Every detail is considered — from our modal blend to the way seams sit against the skin.',
  },
  {
    title: 'Low-Impact Materials',
    description:
      'We favour responsibly sourced fibres that reduce water use and maintain softness over time.',
  },
  {
    title: 'Purpose-Led Giving',
    description:
      '15% of every purchase is directed to mental health and women’s empowerment partners.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="mx-auto max-w-4xl space-y-6 px-4 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Our Story</p>
        <h1 className="font-heading text-4xl md:text-5xl">Quiet refinement, thoughtfully made.</h1>
        <p className="text-base text-black/60">
          CABANA was born from a simple belief: essentials should feel as luxurious as they look.
          We craft underwear and loungewear using breathable modal blends, refined silhouettes, and
          elevated finishing — designed in Australia and made to endure beyond trends.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2 md:px-8">
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">Our Philosophy</h2>
          <p className="mt-3 text-sm text-black/60">
            CABANA exists at the intersection of comfort, aesthetics, and impact. We champion
            understated design, honour craftsmanship, and focus on pieces that become daily
            favourites.
          </p>
        </div>
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">Our Promise</h2>
          <p className="mt-3 text-sm text-black/60">
            We prioritise thoughtful sourcing, gentle finishes, and transparent impact reporting.
            Each release is crafted to feel effortless — and to do more than just look good.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 md:px-8">
        <h2 className="text-center font-heading text-3xl md:text-4xl">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="section-card p-6">
              <h3 className="font-heading text-xl">{value.title}</h3>
              <p className="mt-2 text-sm text-black/60">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white px-6 py-12 md:px-12">
        <h2 className="font-heading text-3xl">The fabric of tomorrow</h2>
        <p className="text-sm text-black/60">
          Our signature modal fabric is sourced from sustainably managed forests and spun into a
          silky, breathable textile. It’s naturally moisture-wicking, softer than cotton, and holds
          its shape and colour wash after wash.
        </p>
        <p className="text-sm text-black/60">
          By choosing modal, we reduce water consumption, energy use, and chemical processing —
          without compromising on the feel you expect from CABANA.
        </p>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-4 md:px-8">
        <h2 className="font-heading text-3xl">Our impact partners</h2>
        <p className="text-sm text-black/60">
          We partner with organisations that support mental health and women&rsquo;s empowerment. These
          partnerships are reviewed regularly to ensure meaningful outcomes.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-black/60">
          <li>Beyond Blue – supporting mental health resources and awareness.</li>
          <li>UN Women Australia – advancing gender equality and economic opportunities.</li>
        </ul>
      </section>

      <section className="mx-auto max-w-5xl rounded-3xl bg-ink px-6 py-12 text-white md:px-12">
        <h2 className="font-heading text-3xl">Discover the CABANA difference.</h2>
        <p className="mt-3 text-sm text-white/70">
          Elevated essentials, consciously made. Explore our curated collection or learn more about
          the impact we’re building.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-white px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink">
            Shop now
          </Link>
          <Link href="/impact" className="rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.2em]">
            Impact
          </Link>
        </div>
      </section>
    </div>
  );
}
