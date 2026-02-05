'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

type AddToCartButtonProps = {
  productId: string
  slug: string
  title: string
  price: number
  image: string
  size: string | null
  colour?: string
  fullWidth?: boolean
}

type ButtonState = 'idle' | 'loading' | 'success'

export default function AddToCartButton({
  productId,
  slug,
  title,
  price,
  image,
  size,
  colour,
  fullWidth,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const openDrawer = useCartStore((state) => state.openDrawer)
  const [state, setState] = useState<ButtonState>('idle')
  const [showError, setShowError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const handleClick = () => {
    if (!size) {
      setShowError(true)
      setIsShaking(true)
      const timer = window.setTimeout(() => setIsShaking(false), 600)
      timersRef.current.push(timer)
      return
    }

    if (state !== 'idle') return

    setShowError(false)
    setState('loading')
    const colourValue = colour ?? 'Natural'
    const timer = window.setTimeout(() => {
      addItem({
        productId,
        slug,
        title,
        price,
        image,
        size,
        colour: colourValue,
      })
      openDrawer()
      setState('success')
      const resetTimer = window.setTimeout(() => setState('idle'), 1500)
      timersRef.current.push(resetTimer)
    }, 600)
    timersRef.current.push(timer)
  }

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none',
          isShaking && 'animate-shake',
        )}
      >
        {state === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        {state === 'success' && <Check className="h-4 w-4" />}
        {state === 'idle' && 'Add to Cart'}
        {state === 'loading' && 'Adding'}
        {state === 'success' && 'Added'}
      </button>
      {showError && (
        <p className="text-xs uppercase tracking-[0.1em] text-[#6e6e73]">Please select a size</p>
      )}
    </div>
  )
}
