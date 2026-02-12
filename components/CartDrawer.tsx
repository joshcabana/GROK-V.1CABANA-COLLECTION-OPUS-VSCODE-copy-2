'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import CartItem from './CartItem'
import { formatMoney } from '@/lib/utils'

function getFocusable(container: HTMLElement | null) {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  )
}

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isDrawerOpen)
  const closeDrawer = useCartStore((state) => state.closeDrawer)
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore((state) => state.subtotal())
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState('')
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const checkoutLines = useMemo(
    () =>
      items.map((item) => ({
        title: item.title,
        priceCents: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    [items]
  )

  useEffect(() => {
    if (isOpen) return
    setError('')
    setIsCheckingOut(false)
  }, [isOpen])

  async function beginCheckout() {
    if (!checkoutLines.length || isCheckingOut) return
    setIsCheckingOut(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: checkoutLines }),
      })

      const payload = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error || 'Checkout is currently unavailable.')
      }

      window.location.assign(payload.url)
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Checkout is currently unavailable.'
      )
      setIsCheckingOut(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement
    const panel = panelRef.current
    const focusables = getFocusable(panel)
    focusables[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDrawer()
        return
      }
      if (event.key !== 'Tab') return
      const items = getFocusable(panel)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [isOpen, closeDrawer])

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-200 motion-reduce:transition-none ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {isOpen && (
        <>
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-full max-w-md transform bg-[#f5f5f7] p-6 shadow-2xl transition-transform duration-300 translate-x-0 motion-reduce:transition-none"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Your Bag</h2>
              </div>
              <button
                className="rounded-full border border-[#d2d2d7] p-2"
                onClick={closeDrawer}
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex h-[calc(100%-200px)] flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-8 w-8 text-[#6e6e73]" />
                  <p className="text-sm text-[#6e6e73]">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => <CartItem key={item.key} item={item} />)
              )}
            </div>

            <div className="mt-6 border-t border-[#d2d2d7] pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.2em] text-[#6e6e73]">Subtotal</span>
                <span className="text-lg font-medium text-[#1d1d1f]">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <button
                className="mt-4 w-full rounded-full bg-[#1d1d1f] py-3 text-sm uppercase tracking-[0.2em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isCheckingOut || !items.length}
                onClick={beginCheckout}
              >
                {isCheckingOut ? 'Redirecting to secure checkout...' : 'Checkout securely'}
              </button>
              {error && <p className="mt-3 text-xs text-[#b3261e]">{error}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
