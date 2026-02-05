import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#d2d2d7] bg-[#f5f5f7]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-[#6e6e73] md:flex-row md:items-center md:justify-between md:px-6">
        <p className="text-xs uppercase tracking-[0.2em]">CABANA · Sustainable Essentials</p>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.1em]">
          <Link href="/privacy" className="transition-colors hover:text-[#1d1d1f]">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-[#1d1d1f]">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
