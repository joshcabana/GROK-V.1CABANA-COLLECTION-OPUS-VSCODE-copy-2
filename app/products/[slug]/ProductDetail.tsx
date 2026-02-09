'use client'

import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import type { Product } from '@/data/products'
import { formatMoney } from '@/lib/utils'
import ProductImageGallery from '@/components/ProductImageGallery'
import SizeSelector from '@/components/SizeSelector'
import AddToCartButton from '@/components/AddToCartButton'

type ProductVideoSource = {
  webm: string
  mp4: string
}

const PRODUCT_360_VIDEO: Partial<Record<Product['id'], ProductVideoSource>> = {
  'mens-boxer-brief-black': {
    webm: '/assets/Images/CABANA-BOXERS-360-opt.webm',
    mp4: '/assets/Images/CABANA-BOXERS-360-opt.mp4',
  },
  'womens-modal-set': {
    webm: '/assets/Images/Women-360-opt.webm',
    mp4: '/assets/Images/Women-360-opt.mp4',
  },
  'signature-starter-set': {
    webm: '/assets/Images/Discover-360-opt.webm',
    mp4: '/assets/Images/Discover-360-opt.mp4',
  },
}

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeMedia, setActiveMedia] = useState<'images' | 'video'>('images')
  const videoSrc = PRODUCT_360_VIDEO[product.id]

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) => variant.size === selectedSize) ?? product.variants[0]
  }, [product.variants, selectedSize])

  return (
    <main className="pb-24 pt-12 md:pt-16 lg:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-2">
        <div className="motion-rise space-y-4">
          {videoSrc && (
            <div className="inline-flex rounded-full border border-line bg-white/95 p-1 shadow-sm">
              <button
                type="button"
                className={
                  activeMedia === 'images'
                    ? 'rounded-full bg-ink px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white'
                    : 'rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors duration-300 hover:text-black'
                }
                onClick={() => setActiveMedia('images')}
                aria-pressed={activeMedia === 'images'}
              >
                Gallery
              </button>
              <button
                type="button"
                className={
                  activeMedia === 'video'
                    ? 'rounded-full bg-ink px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white'
                    : 'rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors duration-300 hover:text-black'
                }
                onClick={() => setActiveMedia('video')}
                aria-pressed={activeMedia === 'video'}
              >
                360 View
              </button>
            </div>
          )}

          {videoSrc && activeMedia === 'video' ? (
            <div className="luxury-surface relative aspect-[4/5] overflow-hidden rounded-3xl p-2">
              <video
                className="h-full w-full rounded-[1.35rem] object-cover"
                controls
                loop
                muted
                playsInline
                preload="metadata"
                poster={product.images[0]?.url}
                aria-label={`${product.title} 360 degree view`}
              >
                <source src={videoSrc.webm} type="video/webm" />
                <source src={videoSrc.mp4} type="video/mp4" />
              </video>
            </div>
          ) : (
            <ProductImageGallery images={product.images} priorityFirst />
          )}
        </div>

        <div className="motion-rise motion-rise-delay-1 space-y-8 lg:sticky lg:top-24 lg:h-fit">
          <div className="space-y-4">
            <p className="luxury-kicker">CABANA</p>
            <h1 className="font-heading text-3xl text-ink md:text-4xl">{product.title}</h1>
            <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm text-black/60">
              <Star className="h-4 w-4 fill-ink text-ink" />
              <span>{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-lg font-medium tabular-nums text-ink">{formatMoney(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-sm tabular-nums text-black/50 line-through">
                  {formatMoney(product.compareAtPrice)}
                </p>
              )}
            </div>
            <p className="text-base leading-relaxed text-black/70">{product.description}</p>
          </div>

          <div className="space-y-4">
            <SizeSelector
              variants={product.variants}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
            <p className="text-xs uppercase tracking-[0.22em] text-black/70">Colour {selectedVariant?.colour}</p>
            <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white/95 px-4 py-4 backdrop-blur md:static md:rounded-3xl md:border md:border-black/5 md:bg-white md:px-6 md:py-6 md:shadow-soft pb-[env(safe-area-inset-bottom)] md:pb-6">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 md:mx-0 md:flex-col md:items-start">
                <div className="md:hidden">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/60">Total</p>
                  <p className="text-base font-medium tabular-nums text-ink">{formatMoney(product.price)}</p>
                </div>
                <div className="w-full">
                  <AddToCartButton
                    productId={product.id}
                    slug={product.slug}
                    title={product.title}
                    price={product.price}
                    image={product.images[0]?.url ?? ''}
                    size={selectedSize}
                    colour={selectedVariant?.colour}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-surface space-y-3 rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-black/70">Features</p>
            <ul className="space-y-2 text-base text-ink">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-[0.45rem] inline-block h-1.5 w-1.5 rounded-full bg-black/55" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="h-8 md:hidden" aria-hidden="true" />
    </main>
  )
}
