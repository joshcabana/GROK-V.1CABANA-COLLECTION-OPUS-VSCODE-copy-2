'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import CartItem from '@/components/CartItem'
import { formatMoney } from '@/lib/utils'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore((state) => state.subtotal())

  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Your Bag</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
            Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#d2d2d7] bg-white px-6 py-16 text-center">
            <ShoppingBag className="h-10 w-10 text-[#6e6e73]" />
            <p className="text-lg font-medium text-[#1d1d1f]">Your bag is empty</p>
            <Link
              href="/products"
              className="btn-glow rounded-full bg-[#1d1d1f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4 rounded-3xl border border-[#d2d2d7] bg-white p-6">
              {items.map((item) => (
                <CartItem key={item.key} item={item} />
              ))}
              <Link
                href="/products"
                className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]"
              >
                Continue Shopping
              </Link>
            </div>
            <div className="h-fit rounded-3xl border border-[#d2d2d7] bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Subtotal</span>
                <span className="text-lg font-medium text-[#1d1d1f]">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <button
                className="mt-4 w-full rounded-full border border-[#d2d2d7] bg-white py-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]"
                disabled
              >
                Checkout unavailable while payments are being finalized
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
