export type ShippingScope = 'AU_ONLY'
export type ImpactProgram = 'mens_mental_health' | 'womens_empowerment' | 'split'

export interface SitePolicy {
  impactPercent: number
  shippingScope: ShippingScope
  supportEmail: string
  impactAllocation: {
    mens: string
    womens: string
    bundle: string
  }
}

export const sitePolicy: SitePolicy = {
  impactPercent: 15,
  shippingScope: 'AU_ONLY',
  supportEmail: 'Cabana.Collections2025@gmail.com',
  impactAllocation: {
    mens: "men's mental health",
    womens: "women's empowerment",
    bundle: '50/50 split',
  },
}

export const supportEmailHref = `mailto:${sitePolicy.supportEmail}`

export function impactPercentLabel() {
  return `${sitePolicy.impactPercent}%`
}

export function shippingScopeLabel() {
  return sitePolicy.shippingScope === 'AU_ONLY' ? 'Australia only' : 'Unknown'
}
