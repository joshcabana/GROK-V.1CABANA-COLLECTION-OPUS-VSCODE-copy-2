'use client'

import { useEffect, useMemo, useRef } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatMoney } from '@/lib/utils'
import CartItem from './CartItem'
import { cn } from '@/lib/utils'

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
}

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const closeDrawer = useCartStore((state) => state.closeDrawer)
  const items = useCartStore((state) => state.items)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const focusable = getFocusableElements(panelRef.current)
    focusable[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer()
      }
      if (event.key !== 'Tab') return
      const elements = getFocusableElements(panelRef.current)
      if (!elements.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [isOpen, closeDrawer])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300 motion-reduce:transition-none motion-reduce:duration-100',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={isOpen ? undefined : true}
      inert={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col gap-6 bg-stone p-6 shadow-2xl transition-transform duration-300 motion-reduce:transition-none motion-reduce:duration-100',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
      >
        {isOpen && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-ink">Your Bag</h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <ShoppingBag className="h-10 w-10 text-ink-muted" />
                <div>
                  <p className="text-lg font-medium text-ink">Your bag is empty</p>
                  <p className="text-sm text-ink-muted">Start with a refined essential.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item) => (
                  <CartItem key={item.key} item={item} />
                ))}
              </div>
            )}

            <div className="border-t border-line pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-muted">Subtotal</span>
                <span className="font-medium tabular-nums text-ink">{formatMoney(subtotal)}</span>
              </div>
              <button
                type="button"
                disabled
                className="mt-4 w-full rounded-full border border-line bg-white px-4 py-3 text-sm font-medium uppercase tracking-[0.1em] text-ink-muted"
              >
                Checkout · Coming Soon
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
