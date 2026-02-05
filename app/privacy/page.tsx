export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Privacy</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          CABANA respects your privacy and is committed to protecting your personal information in
          line with the Australian Privacy Principles.
        </p>
        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">Information we collect</h2>
            <p className="mt-2 text-[#6e6e73]">
              We collect information you provide when you purchase, contact us, or subscribe to our
              updates, including your name, email, delivery address, and order details.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">How we use your information</h2>
            <p className="mt-2 text-[#6e6e73]">
              We use your information to fulfil orders, communicate with you, improve our products,
              and deliver relevant updates.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Access & corrections</h2>
            <p className="mt-2 text-[#6e6e73]">
              You may request access to or correction of your personal information by contacting us.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
