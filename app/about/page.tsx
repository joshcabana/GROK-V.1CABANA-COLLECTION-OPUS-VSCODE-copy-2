import { impactPercentLabel } from '@/lib/policy'

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Our Story
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          CABANA creates understated essentials in premium modal with a focus on comfort, fit, and
          longevity. Each piece is designed in Australia with practical refinement in mind.
        </p>
        <div className="mt-8 space-y-6 text-sm text-[#1d1d1f]">
          <section>
            <h2 className="text-lg font-medium">Material transparency</h2>
            <p className="mt-2 text-[#6e6e73]">
              We use modal-rich fabrics for softness and breathability. Some products include
              elastane for stretch and recovery. Claims about biodegradability apply to modal
              fibres, not all trims or blends.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">Purpose built in</h2>
            <p className="mt-2 text-[#6e6e73]">
              {impactPercentLabel()} of every purchase is allocated to verified initiatives focused
              on men&apos;s mental health and women&apos;s empowerment.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium">What we optimize for</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[#6e6e73]">
              <li>Reliable comfort and fit across daily wear.</li>
              <li>Clear policy language and transparent customer communication.</li>
              <li>Measured progress over marketing overstatement.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
