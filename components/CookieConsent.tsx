'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnalyticsConsent, getStoredAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics'

export default function CookieConsent() {
  const [consent, setConsent] = useState<AnalyticsConsent>('unset')

  useEffect(() => {
    setConsent(getStoredAnalyticsConsent())
  }, [])

  if (consent !== 'unset') return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-[#d2d2d7] bg-white p-4 shadow-xl md:inset-x-6">
      <p className="text-sm text-[#1d1d1f]">
        CABANA uses essential cookies for site functionality. Analytics cookies stay disabled unless
        you opt in.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            setAnalyticsConsent(true)
            setConsent('granted')
          }}
          className="rounded-full bg-[#1d1d1f] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
        >
          Allow Analytics
        </button>
        <button
          onClick={() => {
            setAnalyticsConsent(false)
            setConsent('denied')
          }}
          className="rounded-full border border-[#d2d2d7] bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#6e6e73]"
        >
          Essential Only
        </button>
        <Link
          href="/privacy-policy"
          className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}
