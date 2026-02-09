'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return
    }

    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('[sw] registration failed', error)
    })
  }, [])

  return null
}
