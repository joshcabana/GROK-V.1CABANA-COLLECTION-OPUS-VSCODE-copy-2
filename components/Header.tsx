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

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

export default function Header() {
  const itemCount = useCartStore((state) => state.itemCount())
  const openDrawer = useCartStore((state) => state.openDrawer)
  const navLogoRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const heroWordmarkRef = useRef<HTMLElement | null>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const lastFrameRef = useRef<number | null>(null)
  const tickingRef = useRef(false)
  const dockedRef = useRef(false)
  const [scrolled, setScrolled] = useState(false)
  const [docked, setDocked] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let raf = 0

    const resolveTargets = () => {
      if (!heroWordmarkRef.current) {
        heroWordmarkRef.current = document.querySelector<HTMLElement>('[data-hero-wordmark]')
      }
      if (!heroSectionRef.current) {
        heroSectionRef.current = document.querySelector<HTMLElement>('[data-hero-section]')
      }
    }

    const syncDockedState = (value: boolean) => {
      if (dockedRef.current === value) return
      dockedRef.current = value
      setDocked(value)
      setScrolled(value)
    }

    const applyProgress = (progress: number) => {
      resolveTargets()
      const hero = heroWordmarkRef.current
      const heroSection = heroSectionRef.current
      const navLogo = navLogoRef.current
      const overlay = overlayRef.current
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!navLogo || !overlay || !hero) return
      overlay.style.willChange = 'transform, width, height, opacity'

      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const fadeWindowStart = 0.8
      const dockFade = clamp((easedProgress - fadeWindowStart) / (1 - fadeWindowStart), 0, 1)
      const isDocked = dockFade >= 0.992

      if (reducedMotion) {
        syncDockedState(progress >= 1)
        hero.style.opacity = progress >= 1 ? '0' : '1'
        overlay.style.opacity = '0'
        navLogo.style.opacity = progress >= 1 ? '1' : '0'
        return
      }

      syncDockedState(isDocked)

      if (progress <= 0.001) {
        hero.style.opacity = '1'
        overlay.style.opacity = '0'
        navLogo.style.opacity = '0'
        syncDockedState(false)
        return
      }

      hero.style.opacity = '0'
      const heroRect = hero.getBoundingClientRect()
      const navRect = navLogo.getBoundingClientRect()

      const x = lerp(heroRect.left, navRect.left, easedProgress)
      const y = lerp(heroRect.top, navRect.top, easedProgress)
      const width = lerp(heroRect.width, navRect.width, easedProgress)
      const height = lerp(heroRect.height, navRect.height, easedProgress)
      const heroCabanaSize = Math.min(window.innerWidth * 0.22, 158)
      const navCabanaSize = window.innerWidth < 768 ? 18 : 24
      const heroCollectionsSize = Math.min(window.innerWidth * 0.038, 30)
      const navCollectionsSize = window.innerWidth < 768 ? 8 : 10

      overlay.style.transform = `translate3d(${x}px, ${y}px, 0)`
      overlay.style.width = `${width}px`
      overlay.style.height = `${height}px`
      overlay.style.setProperty(
        '--cabana-size',
        `${lerp(heroCabanaSize, navCabanaSize, easedProgress)}px`
      )
      overlay.style.setProperty(
        '--collections-size',
        `${lerp(heroCollectionsSize, navCollectionsSize, easedProgress)}px`
      )
      overlay.style.setProperty('--cabana-track', `${lerp(0.42, 0.2, easedProgress)}em`)
      overlay.style.setProperty('--collections-track', `${lerp(0.72, 0.34, easedProgress)}em`)
      overlay.style.opacity = `${1 - dockFade}`
      navLogo.style.opacity = `${dockFade}`
    }

    const animate = (timestamp: number) => {
      const current = progressRef.current
      const target = targetProgressRef.current
      const delta = target - current
      const last = lastFrameRef.current ?? timestamp
      const deltaMs = Math.min(timestamp - last, 48)
      lastFrameRef.current = timestamp
      const alpha = clamp(deltaMs / 130, 0.12, 0.42)
      const next = Math.abs(delta) < 0.002 ? target : current + delta * alpha
      progressRef.current = next
      applyProgress(next)
      if (Math.abs(target - next) > 0.002) {
        raf = requestAnimationFrame(animate)
      } else {
        tickingRef.current = false
        lastFrameRef.current = null
      }
    }

    const update = () => {
      resolveTargets()
      const heroSection = heroSectionRef.current
      const scrollY = window.scrollY
      const end = Math.max(
        window.innerWidth < 768 ? 150 : 220,
        heroSection ? heroSection.offsetHeight * 0.28 : window.innerHeight * 0.28
      )
      targetProgressRef.current = clamp(scrollY / end, 0, 1)
      if (!tickingRef.current) {
        tickingRef.current = true
        lastFrameRef.current = null
        raf = requestAnimationFrame(animate)
      }
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
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center text-white opacity-0 transition-opacity duration-200 motion-reduce:transition-none"
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
            <div
              ref={navLogoRef}
              className="text-[#1d1d1f] opacity-0 transition-opacity duration-200"
            >
              <BrandWordmark
                className="leading-none"
                cabanaClassName="text-[22px] tracking-[0.2em]"
                collectionsClassName="text-[9px] tracking-[0.34em]"
              />
            </div>
          </Link>
          <nav
            className={cn(
              'hidden items-center gap-8 text-xs uppercase tracking-[0.2em] transition-colors duration-300 md:flex',
              docked ? 'text-[#1d1d1f]' : 'text-white'
            )}
          >
            <Link href="/" className={cn(docked ? 'hover:text-black/70' : 'hover:text-white/80')}>
              Home
            </Link>
            <Link
              href="/products"
              className={cn(docked ? 'hover:text-black/70' : 'hover:text-white/80')}
            >
              Products
            </Link>
            <Link
              href="/privacy"
              className={cn(docked ? 'hover:text-black/70' : 'hover:text-white/80')}
            >
              Privacy
            </Link>
            <Link href="/terms" className={cn(docked ? 'hover:text-black/70' : 'hover:text-white/80')}>
              Terms
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                'rounded-full p-2 transition-colors duration-300 md:hidden',
                docked
                  ? 'border border-[#d2d2d7] text-[#1d1d1f]'
                  : 'border border-white/70 text-white'
              )}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <button
              onClick={openDrawer}
              className={cn(
                'relative rounded-full p-2 transition-colors duration-300',
                docked
                  ? 'border border-[#d2d2d7] text-[#1d1d1f]'
                  : 'border border-white/70 text-white'
              )}
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
            mobileOpen
              ? docked
                ? 'max-h-64 opacity-100 border-t border-[#d2d2d7] bg-white'
                : 'max-h-64 opacity-100 border-t border-white/35 bg-black/35 backdrop-blur'
              : 'max-h-0 opacity-0'
          )}
        >
          <nav
            className={cn(
              'mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-xs uppercase tracking-[0.2em]',
              docked ? 'text-[#1d1d1f]' : 'text-white'
            )}
          >
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
