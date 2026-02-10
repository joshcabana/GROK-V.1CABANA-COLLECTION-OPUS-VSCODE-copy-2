'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const CartDrawer = dynamic(() => import('./CartDrawer'))
const CookieConsent = dynamic(() => import('./CookieConsent'))

type IdleCallbackHandle = number
type IdleDeadlineLike = { didTimeout: boolean; timeRemaining: () => number }
type IdleCallback = (callback: (deadline: IdleDeadlineLike) => void, options?: { timeout: number }) => IdleCallbackHandle
type CancelIdleCallback = (handle: IdleCallbackHandle) => void

export default function DeferredGlobalUi() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(true)
    const idle = window.requestIdleCallback as IdleCallback | undefined
    const cancelIdle = window.cancelIdleCallback as CancelIdleCallback | undefined

    if (idle && cancelIdle) {
      const handle = idle(() => start(), { timeout: 1200 })
      return () => cancelIdle(handle)
    }

    const timer = window.setTimeout(start, 400)
    return () => window.clearTimeout(timer)
  }, [])

  if (!ready) return null

  return (
    <>
      <CartDrawer />
      <CookieConsent />
    </>
  )
}
