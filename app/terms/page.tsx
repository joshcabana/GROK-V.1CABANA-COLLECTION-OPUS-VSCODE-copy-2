export default function TermsPage() {
  return (
    <main className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">Terms</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.015em] text-ink md:text-4xl">
          Terms of service
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-ink">
          <p>
            By placing an order with CABANA, you agree to provide accurate information and to use
            our products for personal use only. Prices are listed in Australian dollars and include
            applicable taxes where required.
          </p>
          <p>
            We reserve the right to update product availability, pricing, and content without prior
            notice. Orders may be cancelled or refunded if payment cannot be authorised.
          </p>
          <p>
            For questions about shipping, returns, or your order, please contact our support team.
          </p>
        </div>
      </div>
    </main>
  )
}
