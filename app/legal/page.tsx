import Link from 'next/link'
import { supportEmailHref, sitePolicy } from '@/lib/policy'

const links = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/shipping', label: 'Shipping Policy' },
  { href: '/returns', label: 'Return Policy' },
  { href: '/size-guide', label: 'Size Guide' },
  { href: '/care', label: 'Care Instructions' },
]

export default function LegalPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Legal and Policies
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          This index lists CABANA&apos;s active customer and legal policies.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="block rounded-2xl border border-[#d2d2d7] bg-white px-4 py-3 text-sm text-[#1d1d1f] hover:border-[#1d1d1f]"
              >
                {entry.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-[#6e6e73]">
          Support:{' '}
          <a href={supportEmailHref} className="underline hover:no-underline">
            {sitePolicy.supportEmail}
          </a>
        </p>
      </div>
    </main>
  )
}
