'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export default function Header() {
  const itemCount = useCartStore((state) => state.itemCount())
  const openDrawer = useCartStore((state) => state.openDrawer)
  const navLogoRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const hero = document.querySelector<HTMLElement>('[data-hero-logo]')
        const navLogo = navLogoRef.current
        const overlay = overlayRef.current
        const scrollY = window.scrollY
        const end = Math.max(140, window.innerHeight * 0.35)
        const progress = clamp(scrollY / end, 0, 1)
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        setScrolled(progress > 0.05)

        if (!navLogo || !overlay || !hero || reducedMotion) {
          if (navLogo) navLogo.style.opacity = '1'
          if (overlay) overlay.style.opacity = '0'
          return
        }

        hero.style.opacity = '0'
        const heroRect = hero.getBoundingClientRect()
        const navRect = navLogo.getBoundingClientRect()

        const x = heroRect.left + (navRect.left - heroRect.left) * progress
        const y = heroRect.top + (navRect.top - heroRect.top) * progress
        const width = heroRect.width + (navRect.width - heroRect.width) * progress
        const height = heroRect.height + (navRect.height - heroRect.height) * progress

        overlay.style.transform = `translate3d(${x}px, ${y}px, 0)`
        overlay.style.width = `${width}px`
        overlay.style.height = `${height}px`
        overlay.style.opacity = progress < 1 ? '1' : '0'
        navLogo.style.opacity = progress >= 1 ? '1' : '0'
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
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#1d1d1f] transition-opacity duration-200 motion-reduce:transition-none"
        aria-hidden="true"
      >
        CABANA
      </div>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-colors duration-300 motion-reduce:transition-none',
          scrolled ? 'bg-white/90 backdrop-blur border-b border-[#d2d2d7]' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="text-xs uppercase tracking-[0.3em]">
            <span ref={navLogoRef} className="text-[#1d1d1f]">
              CABANA
            </span>
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
      </header>
    </>
  )
}
