import Link from 'next/link'
import { heroImage, products } from '@/data/products'
import SafeImage from '@/components/SafeImage'
import ProductCard from '@/components/ProductCard'

const HERO_SIZES = '100vw'

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#f5f5f7]">
        <div className="relative h-[70vh] min-h-[520px] w-full md:h-[80vh]">
          <SafeImage
            src={heroImage.url}
            alt={heroImage.alt}
            sizes={HERO_SIZES}
            priority
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white/80" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 md:px-6 md:pb-24">
            <div className="max-w-xl">
              <div
                data-hero-logo
                className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#1d1d1f]"
              >
                CABANA
              </div>
              <h1 className="text-5xl font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-6xl">
                Quiet luxury, crafted for every day.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">
                Sustainable modal essentials with a refined, barely-there feel. Designed in Australia
                for effortless comfort.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="rounded-full bg-[#1d1d1f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none"
                >
                  Shop the Collection
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-[#d2d2d7] bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#1d1d1f]"
                >
                  View Sets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Featured</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
                Signature essentials
              </h2>
            </div>
            <Link href="/products" className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
