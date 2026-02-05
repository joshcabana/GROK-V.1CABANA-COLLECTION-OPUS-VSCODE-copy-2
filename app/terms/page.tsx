export default function TermsPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Terms</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          By using CABANA, you agree to these terms and our commitment to quality, sustainability,
          and transparency.
        </p>
        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">Orders</h2>
            <p className="mt-2 text-[#6e6e73]">
              All orders are subject to availability. We reserve the right to cancel or refuse any
              order.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Pricing</h2>
            <p className="mt-2 text-[#6e6e73]">
              Prices are listed in AUD and include GST where applicable.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Contact</h2>
            <p className="mt-2 text-[#6e6e73]">
              For any questions, reach us at Cabana.Collections2025@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
