'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import CartItem from '@/components/CartItem'
import { useCartStore } from '@/lib/store'
import { formatMoney } from '@/lib/utils'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-[#6e6e73]" />
        <div>
          <h1 className="text-2xl font-semibold text-[#1d1d1f]">Your bag is empty</h1>
          <p className="text-sm text-[#6e6e73]">Start shopping the CABANA collection.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none"
        >
          Start Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.1em] text-[#6e6e73]">Cart</p>
          <h1 className="text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
            Your Bag
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.key} item={item} />
            ))}
          </div>
          <div className="h-fit rounded-3xl border border-[#d2d2d7] bg-white p-6">
            <h2 className="text-lg font-medium text-[#1d1d1f]">Order Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-[#6e6e73]">Subtotal</span>
              <span className="font-medium tabular-nums text-[#1d1d1f]">{formatMoney(subtotal)}</span>
            </div>
            <button
              type="button"
              disabled
              className="mt-6 w-full rounded-full border border-[#d2d2d7] bg-[#f5f5f7] px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#6e6e73]"
            >
              Checkout · Coming Soon
            </button>
            <Link
              href="/products"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#d2d2d7] bg-white px-4 py-3 text-xs uppercase tracking-[0.1em] text-[#1d1d1f] transition-colors hover:border-[#1d1d1f]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
