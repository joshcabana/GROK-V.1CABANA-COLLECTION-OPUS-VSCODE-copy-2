'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function Header() {
  const openDrawer = useCartStore((state) => state.openDrawer)
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <header className="border-b border-[#d2d2d7] bg-[#f5f5f7]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1d1d1f]">
          Cabana
        </Link>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.1em] text-[#6e6e73] md:flex">
          <Link href="/products" className="transition-colors hover:text-[#1d1d1f]">
            Shop
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-[#1d1d1f]">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-[#1d1d1f]">
            Terms
          </Link>
        </nav>
        <button
          type="button"
          onClick={openDrawer}
          className="relative inline-flex items-center justify-center rounded-full border border-[#d2d2d7] bg-white p-2 text-[#1d1d1f] transition-transform active:scale-[0.98] motion-reduce:transform-none"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#1d1d1f] px-1 text-[10px] font-semibold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
