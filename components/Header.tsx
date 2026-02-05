'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function Header() {
  const openDrawer = useCartStore((state) => state.openDrawer)
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-stone/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-heading text-xl tracking-[0.3em]">CABANA</span>
          <span className="text-[10px] uppercase tracking-[0.35em] text-black/60">Collections</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-black/70 md:flex">
          <Link href="/products" className="transition-colors hover:text-black">
            Shop
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-black">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-black">
            Terms
          </Link>
        </nav>
        <button
          type="button"
          onClick={openDrawer}
          className="relative inline-flex items-center justify-center rounded-full border border-black/10 bg-white/90 px-3 py-2 text-ink shadow-sm transition hover:border-black/30 active:scale-[0.98] motion-reduce:transform-none"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
