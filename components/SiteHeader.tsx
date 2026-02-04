'use client';

import Link from 'next/link';
import { useState } from 'react';
import { navLinks } from './navLinks';
import { useCart } from '../app/providers';
import MobileNav from './MobileNav';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-stone/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/90 p-2 text-ink shadow-sm transition hover:border-black/30 md:hidden"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="h-0.5 w-5 rounded-full bg-ink"></span>
            <span className="mt-1 h-0.5 w-5 rounded-full bg-ink"></span>
          </button>
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-heading text-xl tracking-[0.3em]">CABANA</span>
            <span className="text-xs uppercase tracking-[0.35em] text-black/60">Collections</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-black/70 transition hover:text-black">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <form action="/products" className="relative">
            <input
              type="search"
              name="query"
              placeholder="Search products"
              className="w-44 rounded-full border border-black/10 bg-white px-4 py-2 text-sm outline-none transition focus:border-black/40"
            />
          </form>
          <Link href="/cart" className="relative rounded-full border border-black/10 bg-white px-4 py-2 text-sm">
            Cart
            {itemCount > 0 && (
              <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <Link
          href="/cart"
          className="relative rounded-full border border-black/10 bg-white px-4 py-2 text-sm md:hidden"
        >
          Cart
          {itemCount > 0 && (
            <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-xs text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
