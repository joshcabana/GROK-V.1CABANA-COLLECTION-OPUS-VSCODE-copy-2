'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import SafeImage from './SafeImage'
import { formatMoney } from '@/lib/utils'
import { useCartStore, type CartLineItem } from '@/lib/store'

const thumbSizes = '96px'

type CartItemProps = {
  item: CartLineItem
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-white p-4">
      <Link href={`/products/${item.slug}`} className="relative h-24 w-20 overflow-hidden rounded-xl bg-stone">
        <SafeImage src={item.image} alt={item.title} sizes={thumbSizes} />
      </Link>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/products/${item.slug}`} className="text-base font-medium text-ink">
              {item.title}
            </Link>
            <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">
              Size {item.size} · Colour {item.colour}
            </p>
          </div>
          <p className="text-sm font-medium tabular-nums text-ink">{formatMoney(item.price)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-2 py-1">
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink transition-transform active:scale-[0.98] disabled:text-line motion-reduce:transform-none"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium tabular-nums text-ink">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink transition-transform active:scale-[0.98] motion-reduce:transform-none"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
