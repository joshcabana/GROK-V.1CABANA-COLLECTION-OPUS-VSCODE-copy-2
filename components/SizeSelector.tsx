'use client'

import { cn } from '@/lib/utils'
import type { ProductVariant } from '@/data/products'

type SizeSelectorProps = {
  variants: ProductVariant[]
  selectedSize: string | null
  onSelect: (size: string) => void
}

export default function SizeSelector({ variants, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.1em] text-[#6e6e73]">Select size</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selectedSize === variant.size
          return (
            <button
              key={variant.size}
              type="button"
              onClick={() => onSelect(variant.size)}
              disabled={!variant.inStock}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1f] focus-visible:ring-offset-2',
                isSelected
                  ? 'border-[#1d1d1f] bg-[#1d1d1f] text-white'
                  : 'border-[#d2d2d7] bg-white text-[#1d1d1f]',
                !variant.inStock && 'cursor-not-allowed border-[#d2d2d7] bg-[#f5f5f7] text-[#6e6e73]',
              )}
            >
              {variant.size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
