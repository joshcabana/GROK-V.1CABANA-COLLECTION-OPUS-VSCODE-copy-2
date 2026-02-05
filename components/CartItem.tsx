'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import SafeImage from './SafeImage'
import { formatMoney } from '@/lib/utils'
import { useCartStore, type CartItem as CartItemType } from '@/lib/store'

export default function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex gap-4 border-b border-[#d2d2d7] pb-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
        <SafeImage src={item.image} alt={item.title} sizes="80px" className="absolute inset-0" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#1d1d1f]">{item.title}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
              {item.size} · {item.colour}
            </p>
          </div>
          <button
            className="rounded-full border border-[#d2d2d7] p-2 text-[#6e6e73] hover:text-[#1d1d1f]"
            onClick={() => removeItem(item.key)}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="rounded-full border border-[#d2d2d7] p-2 text-[#1d1d1f]"
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[24px] text-center text-sm font-medium text-[#1d1d1f]">
              {item.quantity}
            </span>
            <button
              className="rounded-full border border-[#d2d2d7] p-2 text-[#1d1d1f]"
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm font-medium text-[#1d1d1f]">
            {formatMoney(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
