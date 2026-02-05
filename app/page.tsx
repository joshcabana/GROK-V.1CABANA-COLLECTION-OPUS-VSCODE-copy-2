import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import ProductCard from '@/components/ProductCard'
import { heroImage, products } from '@/data/products'

export default function HomePage() {
  const featured = products

  return (
    <div>
      <section className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.1em] text-[#6e6e73]">
              Sustainable essentials
            </p>
            <h1 className="text-5xl font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-6xl">
              Understated luxury, crafted for every day.
            </h1>
            <p className="text-base leading-relaxed text-[#1d1d1f]">
              CABANA pairs mindful materials with a clean, architectural fit. Soft modal blends, clean
              seams, and a calm palette designed to live lightly on the skin.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none"
              >
                Shop the collection
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-[#d2d2d7] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#1d1d1f] transition-colors hover:border-[#1d1d1f]"
              >
                Explore sets
              </Link>
            </div>
          </div>
          <div className="-mx-4 md:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-white md:rounded-[32px]">
              <SafeImage
                src={heroImage.url}
                alt={heroImage.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[#6e6e73]">Featured</p>
              <h2 className="text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
                Effortless essentials
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs uppercase tracking-[0.1em] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
