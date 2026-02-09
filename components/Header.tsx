'use client'

import Link from 'next/link'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'

export default function Header() {
  const openDrawer = useCartStore((state) => state.openDrawer)
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="motion-fade sticky top-0 z-40 border-b border-black/5 bg-stone/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex flex-col leading-tight transition-opacity hover:opacity-90">
          <span className="font-heading text-xl tracking-[0.32em] md:text-[1.35rem]">CABANA</span>
          <span className="text-[10px] uppercase tracking-[0.38em] text-black/60">Collections</span>
        </Link>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.24em] text-black/65 md:flex">
          <Link href="/products" className="transition-colors duration-300 hover:text-black">
            Shop
          </Link>
          <Link href="/privacy" className="transition-colors duration-300 hover:text-black">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors duration-300 hover:text-black">
            Terms
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/92 p-2 text-ink shadow-sm transition duration-300 hover:border-black/30 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={openDrawer}
            className="relative inline-flex items-center justify-center rounded-full border border-black/10 bg-white/92 px-3 py-2 text-ink shadow-sm transition duration-300 hover:border-black/30 active:scale-[0.98] motion-reduce:transform-none"
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
      </div>
      <div
        id="mobile-nav"
        className={
          mobileOpen
            ? 'luxury-surface overflow-hidden border-t border-black/10 transition-[max-height,opacity] duration-300 md:hidden max-h-64 opacity-100 motion-reduce:duration-100'
            : 'overflow-hidden transition-[max-height,opacity] duration-300 md:hidden max-h-0 opacity-0 motion-reduce:duration-100'
        }
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-xs uppercase tracking-[0.22em] text-black/70">
          <Link href="/" className="py-2 transition-colors hover:text-black" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link
            href="/products"
            className="py-2 transition-colors hover:text-black"
            onClick={() => setMobileOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/privacy"
            className="py-2 transition-colors hover:text-black"
            onClick={() => setMobileOpen(false)}
          >
            Privacy
          </Link>
          <Link href="/terms" className="py-2 transition-colors hover:text-black" onClick={() => setMobileOpen(false)}>
            Terms
          </Link>
        </nav>
      </div>
    </header>
  )
}
