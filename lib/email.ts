import { requireServerEnv } from '@/lib/env'
import {
  OrderConfirmationTemplateInput,
  renderOrderConfirmationTemplate,
} from '@/lib/email-templates/order-confirmation'

type ResendResponse = {
  id?: string
  error?: {
    message?: string
  }
}

export type SendOrderConfirmationInput = OrderConfirmationTemplateInput & {
  to: string
}

export async function sendOrderConfirmationEmail(input: SendOrderConfirmationInput) {
  const { RESEND_API_KEY, ORDER_FROM_EMAIL } = requireServerEnv([
    'RESEND_API_KEY',
    'ORDER_FROM_EMAIL',
  ])

  const { subject, html, text } = renderOrderConfirmationTemplate(input)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: ORDER_FROM_EMAIL,
      to: [input.to],
      subject,
      html,
      text,
    }),
  })

  const payload = (await response.json().catch(() => null)) as ResendResponse | null

  if (!response.ok || !payload?.id) {
    throw new Error(payload?.error?.message || 'Failed to send confirmation email via Resend')
  }

  return { id: payload.id }
}
