import Image from 'next/image';
import Link from 'next/link';
import TrustBadges from '../components/TrustBadges';
import ReviewList from '../components/ReviewList';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-black/70">Sustainable Essentials</p>
          <h1 className="font-heading text-4xl md:text-5xl">
            Quiet refinement for body and earth.
          </h1>
          <p className="text-base text-black/60 md:text-lg">
            CABANA designs modern underwear essentials from breathable modal blends. Every
            purchase contributes 15% to mental health and women&rsquo;s empowerment initiatives.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
            >
              Shop the collection
            </Link>
            <Link
              href="/impact"
              className="rounded-full border border-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink"
            >
              See the impact
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-soft">
          <Image
            src="/assets/Images/HERO-BANNER.webp"
            alt="CABANA modal underwear in a soft natural palette"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            quality={70}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="sr-only">Trust and transparency</h2>
        <TrustBadges />
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/70">Featured</p>
            <h2 className="font-heading text-3xl">Signature Pieces</h2>
          </div>
          <Link href="/products" className="text-sm text-black/60">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/70">Why CABANA</p>
          <h2 className="font-heading text-3xl">Designed for touch. Built for impact.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="section-card p-6">
            <h3 className="font-heading text-xl">Modal softness</h3>
            <p className="mt-2 text-sm text-black/60">
              Our modal blend is gentle on skin, breathable, and designed for daily movement.
            </p>
          </div>
          <div className="section-card p-6">
            <h3 className="font-heading text-xl">Thoughtful production</h3>
            <p className="mt-2 text-sm text-black/60">
              We work with suppliers that prioritise low-impact materials and ethical care.
            </p>
          </div>
          <div className="section-card p-6">
            <h3 className="font-heading text-xl">Purpose-led giving</h3>
            <p className="mt-2 text-sm text-black/60">
              15% of revenue is directed to organisations supporting mental health and women.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/70">Reviews</p>
          <h2 className="font-heading text-3xl">Loved by our community</h2>
        </div>
        <ReviewList />
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl bg-ink px-6 py-12 text-white md:px-12">
        <div className="grid gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-center">
          <div>
            <h2 className="font-heading text-3xl">Ready for the CABANA feel?</h2>
            <p className="mt-3 text-sm text-white/70">
              Join our newsletter for early access, product drops, and impact updates.
            </p>
          </div>
          <form className="flex flex-col gap-3 md:flex-row">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full rounded-full px-4 py-3 text-sm text-ink"
              required
            />
            <button
              type="submit"
              className="rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.2em]"
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
