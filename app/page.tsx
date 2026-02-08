import Link from 'next/link'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import BrandWordmark from '@/components/BrandWordmark'

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#f5f5f7]" data-hero-section>
        <div className="relative h-[70vh] min-h-[520px] w-full md:h-[80vh]">
          <div className="absolute inset-0 bg-[#0f1116]" />
          <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_0%,rgba(214,184,133,0.28),rgba(23,26,34,0.86)_58%,rgba(12,14,18,1)_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(115deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_32%),linear-gradient(to_bottom,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_80%)]" />
          <div className="pointer-events-none absolute -left-[18%] top-[8%] h-[38vh] w-[38vh] rounded-full bg-[#b28a54]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-[12%] bottom-[8%] h-[44vh] w-[44vh] rounded-full bg-[#88704a]/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f5f7]/85" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-16">
            <div className="flex w-full justify-center">
              <div data-hero-wordmark className="w-full max-w-[1180px] text-center">
                <BrandWordmark
                  className="w-full text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.52)]"
                  cabanaClassName="text-[clamp(64px,13vw,172px)] tracking-[0.42em]"
                  collectionsClassName="text-[clamp(14px,2.1vw,32px)] tracking-[0.72em]"
                />
              </div>
            </div>
            <div className="max-w-xl">
              <h1 className="text-5xl font-semibold tracking-[-0.02em] text-white md:text-6xl">
                Quiet luxury, tailored for every day.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/78">
                Sustainable modal essentials with a refined, barely-there feel. Designed in Australia
                for effortless comfort. 15% of every purchase supports men’s mental health and
                women’s empowerment.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="btn-glow rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#121418] transition-transform active:scale-[0.98] motion-reduce:transform-none"
                >
                  Shop the Collection
                </Link>
                <Link
                  href="/impact"
                  className="btn-glow rounded-full border border-white/45 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white backdrop-blur"
                >
                  See Your Impact
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
