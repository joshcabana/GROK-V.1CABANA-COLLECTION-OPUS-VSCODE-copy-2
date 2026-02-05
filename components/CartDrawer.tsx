'use client'

import { useEffect, useRef } from 'react'
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
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

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
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-[#f5f5f7] p-6 shadow-2xl transition-transform duration-300 motion-reduce:transition-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
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
            className="mt-4 w-full rounded-full border border-[#d2d2d7] bg-white py-3 text-sm uppercase tracking-[0.2em] text-[#6e6e73]"
            disabled
          >
            Checkout · Coming Soon
          </button>
        </div>
      </div>
    </div>
  )
}
