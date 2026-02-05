import Link from 'next/link'
import { Star } from 'lucide-react'
import SafeImage from './SafeImage'
import { formatMoney } from '@/lib/utils'
import type { Product } from '@/data/products'

const CARD_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

export default function ProductCard({ product }: { product: Product }) {
  const primary = product.images[0]
  const secondary = product.images[1] || product.images[0]

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
        <SafeImage
          src={primary?.url}
          alt={primary?.alt || product.title}
          sizes={CARD_SIZES}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 hidden md:block">
          <SafeImage
            src={secondary?.url}
            alt={secondary?.alt || product.title}
            sizes={CARD_SIZES}
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
          />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-[#1d1d1f] md:text-xl">{product.title}</h3>
          <span className="text-sm font-medium tabular-nums text-[#1d1d1f]">
            {formatMoney(product.price)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
          <Star className="h-3 w-3" />
          {product.rating} · {product.reviewCount} reviews
        </div>
      </div>
    </Link>
  )
}
