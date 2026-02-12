'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useCartStore } from '@/lib/store'

export default function OrderSuccessContent({ sessionId }: { sessionId?: string }) {
  const clearCart = useCartStore((state) => state.clear)
  const clearedRef = useRef(false)

  useEffect(() => {
    if (clearedRef.current) return
    clearCart()
    clearedRef.current = true
  }, [clearCart])

  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Order confirmed</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Thank you for shopping CABANA
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">
          Your payment has been received. A confirmation receipt will be sent by Stripe to the email
          used at checkout.
        </p>
        {sessionId && (
          <p className="mt-3 text-sm text-[#6e6e73]">
            Reference: <span className="font-mono text-[#1d1d1f]">{sessionId}</span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-[#1d1d1f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            Continue shopping
          </Link>
          <Link
            href="/impact"
            className="rounded-full border border-[#d2d2d7] bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]"
          >
            See your impact
          </Link>
        </div>
      </div>
    </main>
  )
}
