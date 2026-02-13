import { impactPercentLabel, sitePolicy } from '@/lib/policy'

export type OrderConfirmationTemplateInput = {
  customerName?: string | null
  orderNumber: string
  orderDateIso: string
  itemCount: number
  totalCents: number
  impactCents: number
  currency: string
}

function formatCurrency(cents: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(cents / 100)
  } catch {
    return `$${(cents / 100).toFixed(2)}`
  }
}

export function renderOrderConfirmationTemplate(input: OrderConfirmationTemplateInput) {
  const customerLabel = input.customerName?.trim() || 'there'
  const totalLabel = formatCurrency(input.totalCents, input.currency)
  const impactLabel = formatCurrency(input.impactCents, input.currency)
  const orderDateLabel = new Date(input.orderDateIso).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const subject = `CABANA Order Confirmation #${input.orderNumber}`
  const text = [
    `Hi ${customerLabel},`,
    '',
    `Thank you for shopping with CABANA. Your order #${input.orderNumber} has been confirmed.`,
    `Order date: ${orderDateLabel}`,
    `Items: ${input.itemCount}`,
    `Order total: ${totalLabel}`,
    `${impactPercentLabel()} donated: ${impactLabel}`,
    '',
    `Need support? Reply to this email or contact ${sitePolicy.supportEmail}.`,
  ].join('\n')

  const html = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1d1d1f; background: #f5f5f0; padding: 32px;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e6e4de; border-radius: 16px; padding: 28px;">
      <p style="margin: 0 0 12px; letter-spacing: 0.18em; text-transform: uppercase; font-size: 11px; color: #6e6e73;">Order Confirmed</p>
      <h1 style="margin: 0 0 12px; font-size: 28px; line-height: 1.2;">Thank you, ${customerLabel}.</h1>
      <p style="margin: 0 0 20px; color: #4c4c50; font-size: 15px; line-height: 1.6;">
        Your CABANA order has been confirmed and is now in processing.
      </p>
      <div style="border: 1px solid #e6e4de; border-radius: 12px; padding: 16px; background: #fafaf7;">
        <p style="margin: 0 0 6px; font-size: 13px; color: #6e6e73;">Order number</p>
        <p style="margin: 0 0 14px; font-size: 16px; font-weight: 600;">${input.orderNumber}</p>
        <p style="margin: 0 0 6px; font-size: 13px; color: #6e6e73;">Order date</p>
        <p style="margin: 0 0 14px; font-size: 15px;">${orderDateLabel}</p>
        <p style="margin: 0 0 6px; font-size: 13px; color: #6e6e73;">Items</p>
        <p style="margin: 0 0 14px; font-size: 15px;">${input.itemCount}</p>
        <p style="margin: 0 0 6px; font-size: 13px; color: #6e6e73;">Order total</p>
        <p style="margin: 0 0 14px; font-size: 18px; font-weight: 600;">${totalLabel}</p>
        <p style="margin: 0 0 6px; font-size: 13px; color: #6e6e73;">${impactPercentLabel()} impact contribution</p>
        <p style="margin: 0; font-size: 15px;">${impactLabel}</p>
      </div>
      <p style="margin: 20px 0 0; color: #4c4c50; font-size: 14px; line-height: 1.6;">
        Questions? Reply to this email or contact
        <a href="mailto:${sitePolicy.supportEmail}" style="color: #1d1d1f;">${sitePolicy.supportEmail}</a>.
      </p>
    </div>
  </div>
  `

  return { subject, text, html }
}
