import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#6e6e73]">
          The page you requested could not be found. Continue exploring the CABANA collection below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#1d1d1f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-[#d2d2d7] bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]"
          >
            Shop products
          </Link>
        </div>
      </div>
    </main>
  )
}
