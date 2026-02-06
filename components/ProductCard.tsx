import Link from 'next/link'
import { Star } from 'lucide-react'
import type { Product } from '@/data/products'
import SafeImage from './SafeImage'
import { formatMoney } from '@/lib/utils'
import { cn } from '@/lib/utils'

const cardSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasSecondary = product.images.length > 1

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition-transform hover:-translate-y-1 motion-reduce:transform-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <SafeImage src={product.images[0]?.url} alt={product.images[0]?.alt ?? product.title} sizes={cardSizes} />
        {hasSecondary && (
          <SafeImage
            src={product.images[1]?.url}
            alt={product.images[1]?.alt ?? `${product.title} alternate view`}
            sizes={cardSizes}
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-0',
            )}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-black/70">
          {product.category === 'mens' ? 'Men' : product.category === 'womens' ? 'Women' : 'Sets'}
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-lg text-ink md:text-xl">{product.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-sm font-medium tabular-nums text-ink">{formatMoney(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-sm tabular-nums text-black/70 line-through">
                  {formatMoney(product.compareAtPrice)}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-black/60">
            <Star className="h-4 w-4 fill-ink text-ink" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-xs">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
