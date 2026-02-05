import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import ProductCard from '@/components/ProductCard'
import { heroImage, products } from '@/data/products'

export default function HomePage() {
  const featured = products.slice(0, 3)

  return (
    <div className="space-y-20 pb-20">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-black/70">Sustainable Essentials</p>
          <h1 className="font-heading text-4xl md:text-5xl">Quiet refinement for body and earth.</h1>
          <p className="text-base text-black/60 md:text-lg">
            CABANA designs modern underwear essentials from breathable modal blends. Quietly
            luxurious construction with a clean silhouette and all-day comfort.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none"
            >
              Shop the collection
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:bg-black/5"
            >
              Explore sets
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-soft">
          <SafeImage
            src={heroImage.url}
            alt={heroImage.alt}
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="section-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-black/70">Trust</p>
            <h2 className="mt-2 font-heading text-lg">Sustainable Materials</h2>
            <p className="mt-2 text-sm text-black/60">
              Low-impact modal and responsible production partners.
            </p>
          </article>
          <article className="section-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-black/70">Trust</p>
            <h2 className="mt-2 font-heading text-lg">Breathable Comfort</h2>
            <p className="mt-2 text-sm text-black/60">
              Soft, temperature-balanced fabric designed for daily movement.
            </p>
          </article>
          <article className="section-card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-black/70">Trust</p>
            <h2 className="mt-2 font-heading text-lg">Purpose Led</h2>
            <p className="mt-2 text-sm text-black/60">
              CABANA builds for long wear, lower waste, and thoughtful packaging.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/70">Featured</p>
            <h2 className="font-heading text-3xl">Signature Pieces</h2>
          </div>
          <Link href="/products" className="text-sm text-black/60 transition-colors hover:text-black">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/70">Why CABANA</p>
          <h2 className="font-heading text-3xl">Designed for touch. Built to last.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="section-card p-6">
            <h3 className="font-heading text-xl">Modal softness</h3>
            <p className="mt-2 text-sm text-black/60">
              Our modal blend is gentle on skin, breathable, and made for long wear.
            </p>
          </article>
          <article className="section-card p-6">
            <h3 className="font-heading text-xl">Thoughtful production</h3>
            <p className="mt-2 text-sm text-black/60">
              We prioritise suppliers that support lower impact and ethical practices.
            </p>
          </article>
          <article className="section-card p-6">
            <h3 className="font-heading text-xl">Everyday performance</h3>
            <p className="mt-2 text-sm text-black/60">
              Sculpted fit, smooth seams, and a clean finish that stays comfortable all day.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl bg-ink px-6 py-12 text-white md:px-12">
        <div className="grid gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-center">
          <div>
            <h2 className="font-heading text-3xl">Ready for the CABANA feel?</h2>
            <p className="mt-3 text-sm text-white/70">
              Join our newsletter for early access, new drops, and product updates.
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
  )
}
