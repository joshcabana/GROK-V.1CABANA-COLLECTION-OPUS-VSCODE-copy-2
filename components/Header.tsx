'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const isHomeRoute = pathname === '/'
  const initialNavDark = !isHomeRoute
  const itemCount = useCartStore((state) => state.itemCount())
  const openDrawer = useCartStore((state) => state.openDrawer)
  const navLogoRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const heroWordmarkRef = useRef<HTMLElement | null>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const startRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)
  const endRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)
  const measuredRef = useRef(false)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const tickingRef = useRef(false)
  const navDarkRef = useRef(false)
  const dockedRef = useRef(false)
  const [navDark, setNavDark] = useState(initialNavDark)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!isHomeRoute) {
      heroWordmarkRef.current = null
      heroSectionRef.current = null
      startRectRef.current = null
      endRectRef.current = null
      measuredRef.current = false
      navDarkRef.current = true
      dockedRef.current = true
      setNavDark(true)
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0'
      }
      if (navLogoRef.current) {
        navLogoRef.current.style.opacity = '1'
      }
      return
    }

    navDarkRef.current = false
    dockedRef.current = false
    setNavDark(false)

    let raf = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resolveTargets = () => {
      if (heroWordmarkRef.current && !heroWordmarkRef.current.isConnected) {
        heroWordmarkRef.current = null
        measuredRef.current = false
      }
      if (heroSectionRef.current && !heroSectionRef.current.isConnected) {
        heroSectionRef.current = null
      }
      if (!heroWordmarkRef.current) {
        heroWordmarkRef.current = document.querySelector<HTMLElement>('[data-hero-wordmark]')
      }
      if (!heroSectionRef.current) {
        heroSectionRef.current = document.querySelector<HTMLElement>('[data-hero-section]')
      }
    }

    const measureRects = () => {
      resolveTargets()
      const hero = heroWordmarkRef.current
      const navLogo = navLogoRef.current
      const overlay = overlayRef.current
      if (!hero || !navLogo) return

      const heroRect = hero.getBoundingClientRect()
      const navRect = navLogo.getBoundingClientRect()

      startRectRef.current = {
        left: heroRect.left + window.scrollX,
        top: heroRect.top + window.scrollY,
        width: heroRect.width,
        height: heroRect.height,
      }

      endRectRef.current = {
        left: navRect.left,
        top: navRect.top,
        width: navRect.width,
        height: navRect.height,
      }
      if (overlay) {
        overlay.style.width = `${heroRect.width}px`
        overlay.style.height = `${heroRect.height}px`
      }
      measuredRef.current = true
    }

    const syncNavDarkState = (value: boolean) => {
      if (navDarkRef.current === value) return
      navDarkRef.current = value
      setNavDark(value)
    }

    const applyProgress = (progress: number) => {
      resolveTargets()
      const hero = heroWordmarkRef.current
      const heroSection = heroSectionRef.current
      const navLogo = navLogoRef.current
      const overlay = overlayRef.current

      if (!navLogo || !overlay || !hero) return
      if (!measuredRef.current) {
        measureRects()
      }
      overlay.style.willChange = 'transform, opacity'

      const easedProgress = 1 - Math.pow(1 - progress, 2.2)
      const dockEnter = 0.986
      const dockExit = 0.93
      const isDocked = dockedRef.current ? easedProgress > dockExit : easedProgress >= dockEnter
      dockedRef.current = isDocked
      const darkNav = isDocked

      if (reducedMotion) {
        syncNavDarkState(progress >= 0.98)
        hero.style.opacity = progress >= 0.98 ? '0' : '1'
        overlay.style.opacity = '0'
        navLogo.style.opacity = progress >= 0.98 ? '1' : '0'
        return
      }

      syncNavDarkState(darkNav)

      if (progress <= 0.008) {
        hero.style.opacity = '1'
        overlay.style.opacity = '0'
        navLogo.style.opacity = '0'
        dockedRef.current = false
        syncNavDarkState(false)
        return
      }

      hero.style.opacity = '0'
      const startRect = startRectRef.current
      const endRect = endRectRef.current
      if (!startRect || !endRect) return

      const heroLeft = startRect.left - window.scrollX
      const heroTop = startRect.top - window.scrollY

      const x = lerp(heroLeft, endRect.left, easedProgress)
      const y = lerp(heroTop, endRect.top, easedProgress)
      const targetScaleX = endRect.width / startRect.width
      const targetScaleY = endRect.height / startRect.height
      const scaleX = lerp(1, targetScaleX, easedProgress)
      const scaleY = lerp(1, targetScaleY, easedProgress)
      const overlayFadeProgress = clamp((easedProgress - 0.8) / 0.18, 0, 1)
      const navLogoFade = clamp((easedProgress - 0.88) / 0.1, 0, 1)

      overlay.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`
      overlay.style.opacity = `${1 - overlayFadeProgress}`
      navLogo.style.opacity = `${navLogoFade}`
    }

    const animate = () => {
      const target = targetProgressRef.current
      currentProgressRef.current = target
      applyProgress(target)
      tickingRef.current = false
    }

    const update = () => {
      resolveTargets()
      const heroSection = heroSectionRef.current
      const scrollY = window.scrollY
      if (!measuredRef.current || scrollY <= 2) {
        measureRects()
      }
      const end = Math.max(
        window.innerWidth < 768 ? 150 : 220,
        heroSection ? heroSection.offsetHeight * 0.28 : window.innerHeight * 0.28
      )
      targetProgressRef.current = clamp(scrollY / end, 0, 1)
      if (!tickingRef.current) {
        tickingRef.current = true
        raf = requestAnimationFrame(animate)
      }
    }

    const onResize = () => {
      measuredRef.current = false
      update()
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', onResize)
    }
  }, [isHomeRoute])

  return (
    <>
      <div
        ref={overlayRef}
        data-testid="brand-wordmark-overlay"
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center text-white opacity-0"
        style={{ transformOrigin: 'top left' }}
        aria-hidden="true"
      >
        <BrandWordmark
          className="flex h-full w-full flex-col items-center justify-center text-center"
          cabanaClassName="text-[clamp(64px,13vw,172px)] tracking-[0.42em]"
          collectionsClassName="text-[clamp(14px,2.1vw,32px)] tracking-[0.72em]"
        />
      </div>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-colors duration-150 motion-reduce:transition-none',
          navDark ? 'bg-white border-b border-[#d2d2d7]' : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center">
            <div
              ref={navLogoRef}
              className={cn('text-[#1d1d1f]', isHomeRoute ? 'opacity-0' : 'opacity-100')}
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
              'hidden items-center gap-6 text-xs uppercase tracking-[0.2em] transition-colors duration-150 md:flex',
              navDark ? 'text-[#1d1d1f]' : 'text-white'
            )}
          >
            <Link href="/" className={cn(navDark ? 'hover:text-black/70' : 'hover:text-white/80')}>
              Home
            </Link>
            <Link
              href="/products"
              className={cn(navDark ? 'hover:text-black/70' : 'hover:text-white/80')}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={cn(navDark ? 'hover:text-black/70' : 'hover:text-white/80')}
            >
              About
            </Link>
            <Link href="/impact" className={cn(navDark ? 'hover:text-black/70' : 'hover:text-white/80')}>
              Impact
            </Link>
            <Link href="/contact" className={cn(navDark ? 'hover:text-black/70' : 'hover:text-white/80')}>
              Contact
            </Link>
            <Link href="/legal" className={cn(navDark ? 'hover:text-black/70' : 'hover:text-white/80')}>
              Legal
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className={cn(
                'rounded-full p-2 transition-colors duration-150 md:hidden',
                navDark
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
                'relative rounded-full p-2 transition-colors duration-150',
                navDark
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
              ? navDark
                ? 'max-h-64 opacity-100 border-t border-[#d2d2d7] bg-white'
                : 'max-h-64 opacity-100 border-t border-white/35 bg-black/35 backdrop-blur'
              : 'max-h-0 opacity-0'
          )}
        >
          <nav
            className={cn(
              'mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-xs uppercase tracking-[0.2em]',
              navDark ? 'text-[#1d1d1f]' : 'text-white'
            )}
          >
            <Link href="/" className="py-2" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="py-2" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link href="/about" className="py-2" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/impact" className="py-2" onClick={() => setMobileOpen(false)}>
              Impact
            </Link>
            <Link href="/contact" className="py-2" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <Link href="/legal" className="py-2" onClick={() => setMobileOpen(false)}>
              Legal
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
