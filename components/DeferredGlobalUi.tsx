'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const CookieConsent = dynamic(() => import('./CookieConsent'))

type IdleCallbackHandle = number
type IdleDeadlineLike = { didTimeout: boolean; timeRemaining: () => number }
type IdleCallback = (callback: (deadline: IdleDeadlineLike) => void, options?: { timeout: number }) => IdleCallbackHandle
type CancelIdleCallback = (handle: IdleCallbackHandle) => void

export default function DeferredGlobalUi() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ready) return

    const start = () => setReady(true)
    const interactionEvents: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart']
    const onInteraction = () => start()

    for (const eventName of interactionEvents) {
      window.addEventListener(eventName, onInteraction, { passive: true, once: true })
    }

    const idle = window.requestIdleCallback as IdleCallback | undefined
    const cancelIdle = window.cancelIdleCallback as CancelIdleCallback | undefined
    const timer = window.setTimeout(start, 3000)

    if (idle && cancelIdle) {
      const handle = idle(() => start(), { timeout: 3000 })
      return () => {
        window.clearTimeout(timer)
        cancelIdle(handle)
        for (const eventName of interactionEvents) {
          window.removeEventListener(eventName, onInteraction)
        }
      }
    }

    return () => {
      window.clearTimeout(timer)
      for (const eventName of interactionEvents) {
        window.removeEventListener(eventName, onInteraction)
      }
    }
  }, [ready])

  if (!ready) return null

  return <CookieConsent />
}
