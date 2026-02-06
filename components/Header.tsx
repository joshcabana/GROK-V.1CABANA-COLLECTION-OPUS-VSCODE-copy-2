'use client'

import Link from 'next/link'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import BrandWordmark from './BrandWordmark'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function Header() {
  const itemCount = useCartStore((state) => state.itemCount())
  const openDrawer = useCartStore((state) => state.openDrawer)
  const navLogoRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const hero = document.querySelector<HTMLElement>('[data-hero-wordmark]')
        const heroSection = document.querySelector<HTMLElement>('[data-hero-section]')
        const navLogo = navLogoRef.current
        const overlay = overlayRef.current
        const scrollY = window.scrollY
        const end = Math.max(
          220,
          heroSection ? heroSection.offsetHeight * 0.58 : window.innerHeight * 0.42
        )
        const progress = clamp(scrollY / end, 0, 1)
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        setScrolled(progress > 0.08)

        if (!navLogo || !overlay || !hero || reducedMotion) {
          if (navLogo) navLogo.style.opacity = '1'
          if (overlay) overlay.style.opacity = '0'
          if (hero) hero.style.opacity = '1'
          return
        }

        hero.style.opacity = `${Math.max(0, 1 - progress * 1.6)}`
        const heroRect = hero.getBoundingClientRect()
        const navRect = navLogo.getBoundingClientRect()

        const x = heroRect.left + (navRect.left - heroRect.left) * progress
        const y = heroRect.top + (navRect.top - heroRect.top) * progress
        const width = heroRect.width + (navRect.width - heroRect.width) * progress
        const height = heroRect.height + (navRect.height - heroRect.height) * progress
        const heroCabanaSize = Math.min(window.innerWidth * 0.22, 158)
        const navCabanaSize = window.innerWidth < 768 ? 18 : 24
        const heroCollectionsSize = Math.min(window.innerWidth * 0.038, 30)
        const navCollectionsSize = window.innerWidth < 768 ? 8 : 10

        overlay.style.transform = `translate3d(${x}px, ${y}px, 0)`
        overlay.style.width = `${width}px`
        overlay.style.height = `${height}px`
        overlay.style.opacity = progress < 0.98 ? '1' : '0'
        overlay.style.setProperty(
          '--cabana-size',
          `${heroCabanaSize + (navCabanaSize - heroCabanaSize) * progress}px`
        )
        overlay.style.setProperty(
          '--collections-size',
          `${heroCollectionsSize + (navCollectionsSize - heroCollectionsSize) * progress}px`
        )
        overlay.style.setProperty('--cabana-track', `${0.42 + (0.2 - 0.42) * progress}em`)
        overlay.style.setProperty('--collections-track', `${0.72 + (0.34 - 0.72) * progress}em`)
        navLogo.style.opacity = `${clamp((progress - 0.6) / 0.4, 0, 1)}`
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center transition-opacity duration-200 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <BrandWordmark
          className="flex h-full w-full flex-col items-center justify-center text-center"
          cabanaClassName="text-[var(--cabana-size)] tracking-[var(--cabana-track)]"
          collectionsClassName="text-[var(--collections-size)] tracking-[var(--collections-track)]"
        />
      </div>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-colors duration-300 motion-reduce:transition-none',
          scrolled ? 'bg-white/90 backdrop-blur border-b border-[#d2d2d7]' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center">
            <div ref={navLogoRef} className="text-[#1d1d1f] transition-opacity duration-200">
              <BrandWordmark
                className="leading-none"
                cabanaClassName="text-[22px] tracking-[0.2em]"
                collectionsClassName="text-[9px] tracking-[0.34em]"
              />
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-[#1d1d1f] md:flex">
            <Link href="/" className="hover:text-black/70">
              Home
            </Link>
            <Link href="/products" className="hover:text-black/70">
              Products
            </Link>
            <Link href="/privacy" className="hover:text-black/70">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black/70">
              Terms
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-full border border-[#d2d2d7] p-2 md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <button
              onClick={openDrawer}
              className="relative rounded-full border border-[#d2d2d7] p-2"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#1d1d1f] px-1 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div
          id="mobile-nav"
          className={cn(
            'md:hidden overflow-hidden transition-[max-height,opacity] duration-200 motion-reduce:transition-none',
            mobileOpen ? 'max-h-64 opacity-100 border-t border-[#d2d2d7]' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-xs uppercase tracking-[0.2em] text-[#1d1d1f]">
            <Link href="/" className="py-2" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="py-2" onClick={() => setMobileOpen(false)}>
              Products
            </Link>
            <Link href="/privacy" className="py-2" onClick={() => setMobileOpen(false)}>
              Privacy
            </Link>
            <Link href="/terms" className="py-2" onClick={() => setMobileOpen(false)}>
              Terms
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
