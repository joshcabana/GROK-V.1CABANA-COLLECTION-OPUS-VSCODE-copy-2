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
        <ShoppingBag className="h-12 w-12 text-black/60" />
        <div>
          <h1 className="font-heading text-3xl text-ink">Your bag is empty</h1>
          <p className="text-sm text-black/60">Start shopping the CABANA collection.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none"
        >
          Start Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-black/70">Cart</p>
          <h1 className="font-heading text-3xl">Your Bag</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.key} item={item} />
            ))}
          </div>
          <div className="section-card h-fit p-6">
            <h2 className="font-heading text-xl text-ink">Order Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-black/60">Subtotal</span>
              <span className="font-medium tabular-nums text-ink">{formatMoney(subtotal)}</span>
            </div>
            <button
              type="button"
              disabled
              className="mt-6 w-full rounded-full border border-black/10 bg-stone px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black/60"
            >
              Checkout · Coming Soon
            </button>
            <Link
              href="/products"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-black/30"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
