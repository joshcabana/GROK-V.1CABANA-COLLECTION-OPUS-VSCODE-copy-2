'use client'

import { Check, Loader2, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Product } from '@/data/products'
import { useCartStore } from '@/lib/store'
import { cn, formatMoney } from '@/lib/utils'

export default function AddToCartButton({
  product,
  selectedSize,
}: {
  product: Product
  selectedSize: Product['variants'][number]['size'] | null
}) {
  const addItem = useCartStore((state) => state.addItem)
  const openDrawer = useCartStore((state) => state.openDrawer)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [shake, setShake] = useState(false)

  const variant = useMemo(
    () => product.variants.find((v) => v.size === selectedSize) || product.variants[0],
    [product, selectedSize]
  )

  useEffect(() => {
    if (!shake) return
    const timer = setTimeout(() => setShake(false), 500)
    return () => clearTimeout(timer)
  }, [shake])

  const handleAdd = async () => {
    if (!selectedSize || !variant) {
      setStatus('error')
      setShake(true)
      return
    }
    setStatus('loading')
    await new Promise((resolve) => setTimeout(resolve, 300))
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      colour: variant.colour,
      image: product.images[0]?.url || 'https://placehold.co/800x1000?text=CABANA',
    })
    openDrawer()
    setStatus('success')
    setTimeout(() => setStatus('idle'), 1500)
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleAdd}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] py-3 text-sm uppercase tracking-[0.2em] text-white transition-transform active:scale-[0.98] motion-reduce:transform-none',
          shake && 'animate-shake'
        )}
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'success' && <Check className="h-4 w-4" />}
        {status === 'idle' && <ShoppingBag className="h-4 w-4" />}
        {status === 'loading'
          ? 'Adding'
          : status === 'success'
          ? 'Added'
          : `Add to Bag · ${formatMoney(product.price)}`}
      </button>
      {status === 'error' && (
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Please select a size</p>
      )}
    </div>
  )
}
