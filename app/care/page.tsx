export default function CarePage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Care</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Care Instructions
        </h1>
        <p className="mt-6 text-sm text-[#6e6e73]">
          Follow these steps to keep your CABANA pieces soft, stable, and long-lasting.
        </p>

        <ol className="mt-8 list-decimal space-y-3 pl-6 text-sm text-[#1d1d1f]">
          <li>Machine wash cold with similar colours.</li>
          <li>Use mild detergent and avoid bleach.</li>
          <li>Do not tumble dry; line dry in shade.</li>
          <li>Cool iron only when needed.</li>
          <li>Avoid rough surfaces that can snag fibres.</li>
        </ol>
      </div>
    </main>
  )
}
