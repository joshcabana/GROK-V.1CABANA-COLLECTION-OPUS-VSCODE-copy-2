'use client'

import type { ProductVariant } from '@/data/products'
import { cn } from '@/lib/utils'

type Props = {
  variants: ProductVariant[]
  selectedSize: ProductVariant['size'] | null
  onSelect: (size: ProductVariant['size']) => void
}

export default function SizeSelector({ variants, selectedSize, onSelect }: Props) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Size</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.size}
            onClick={() => onSelect(variant.size)}
            disabled={!variant.inStock}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              selectedSize === variant.size
                ? 'border-[#1d1d1f] text-[#1d1d1f]'
                : 'border-[#d2d2d7] text-[#6e6e73]',
              !variant.inStock && 'cursor-not-allowed opacity-40'
            )}
          >
            {variant.size}
          </button>
        ))}
      </div>
    </div>
  )
}
