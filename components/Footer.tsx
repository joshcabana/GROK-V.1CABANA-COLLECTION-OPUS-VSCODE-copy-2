import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div className="space-y-4">
          <div className="font-heading text-xl tracking-[0.3em]">CABANA</div>
          <p className="text-sm text-black/60">
            Sustainable essentials for people who care about feel, form, and impact.
          </p>
          <p className="text-sm text-black/60">Designed in Australia.</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-black/70">Shop</p>
          <Link href="/products" className="block text-black/70 transition-colors hover:text-black">
            All Products
          </Link>
          <Link href="/products" className="block text-black/70 transition-colors hover:text-black">
            Men
          </Link>
          <Link href="/products" className="block text-black/70 transition-colors hover:text-black">
            Women
          </Link>
          <Link href="/products" className="block text-black/70 transition-colors hover:text-black">
            Bundles
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-black/70">Legal</p>
          <Link href="/privacy" className="block text-black/70 transition-colors hover:text-black">
            Privacy Policy
          </Link>
          <Link href="/terms" className="block text-black/70 transition-colors hover:text-black">
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-black/70">
        &copy; {year} CABANA Collections. All rights reserved.
      </div>
    </footer>
  )
}
