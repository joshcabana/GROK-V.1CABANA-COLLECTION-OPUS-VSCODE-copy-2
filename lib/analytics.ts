export type AnalyticsConsent = 'granted' | 'denied' | 'unset'

export const ANALYTICS_CONSENT_KEY = 'cabana-analytics-consent'
export const ANALYTICS_CONSENT_EVENT = 'cabana:analytics-consent-changed'

function normalizeConsent(value: string | null): AnalyticsConsent {
  if (value === 'granted' || value === 'denied') return value
  return 'unset'
}

export function getStoredAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return 'unset'
  return normalizeConsent(window.localStorage.getItem(ANALYTICS_CONSENT_KEY))
}

export function hasAnalyticsConsent(): boolean {
  return getStoredAnalyticsConsent() === 'granted'
}

export function setAnalyticsConsent(granted: boolean) {
  if (typeof window === 'undefined') return
  const consent: AnalyticsConsent = granted ? 'granted' : 'denied'
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent)
  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, {
      detail: { consent },
    })
  )
}

export function runIfAnalyticsAllowed(callback: () => void) {
  if (hasAnalyticsConsent()) callback()
}
