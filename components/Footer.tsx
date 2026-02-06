import Link from 'next/link'
import BrandWordmark from './BrandWordmark'

export default function Footer() {
  return (
    <footer className="border-t border-[#d2d2d7] bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <BrandWordmark
            cabanaClassName="text-[24px] tracking-[0.22em]"
            collectionsClassName="text-[10px] tracking-[0.36em]"
          />
          <p className="mt-3 text-sm text-[#6e6e73]">
            Quiet refinement in sustainable essentials, designed in Australia.
          </p>
        </div>
        <div className="text-sm text-[#1d1d1f]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Explore</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/products" className="hover:text-black/70">
                Products
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-black/70">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-black/70">
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-[#1d1d1f]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Details</p>
          <p className="mt-3 text-[#6e6e73]">ABN: [INSERT ABN]</p>
          <p className="text-[#6e6e73]">Canberra ACT 2601</p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
            GST included where applicable
          </p>
        </div>
      </div>
    </footer>
  )
}
