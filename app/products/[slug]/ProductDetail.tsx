'use client'

import { useState } from 'react'
import ProductImageGallery from '@/components/ProductImageGallery'
import SizeSelector from '@/components/SizeSelector'
import AddToCartButton from '@/components/AddToCartButton'
import { formatMoney } from '@/lib/utils'
import type { Product } from '@/data/products'

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<Product['variants'][number]['size'] | null>(null)

  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-2">
        <ProductImageGallery images={product.images} />
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">{product.category}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">{product.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium tabular-nums text-[#1d1d1f]">
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-[#6e6e73] line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>
          <SizeSelector
            variants={product.variants}
            selectedSize={selectedSize}
            onSelect={(size) => setSelectedSize(size)}
          />
          <div className="hidden md:block">
            <AddToCartButton product={product} selectedSize={selectedSize} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Features</p>
            <ul className="mt-3 space-y-2 text-sm text-[#1d1d1f]">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1d1d1f]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 px-4 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] md:hidden pb-[env(safe-area-inset-bottom)]">
        <AddToCartButton product={product} selectedSize={selectedSize} />
      </div>
    </main>
  )
}
