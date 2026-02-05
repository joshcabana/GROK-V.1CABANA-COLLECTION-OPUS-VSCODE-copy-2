'use client'

import { useMemo, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'
import { cn } from '@/lib/utils'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Men', value: 'mens' },
  { label: 'Women', value: 'womens' },
  { label: 'Sets', value: 'bundle' },
] as const

type FilterValue = (typeof filters)[number]['value']

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return products
    return products.filter((product) => product.category === activeFilter)
  }, [activeFilter])

  return (
    <main className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl space-y-6 px-4 md:px-8">
        <div className="section-card p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/70">Shop</p>
              <h1 className="font-heading text-3xl">CABANA Collection</h1>
              <p className="mt-2 text-sm text-black/60">
                Curated essentials for men, women, and signature sets.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors',
                    activeFilter === filter.value
                      ? 'border-ink bg-ink text-white'
                      : 'border-black/10 bg-white text-black/60 hover:border-black/30 hover:text-black',
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-black/70">{filtered.length} items</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
