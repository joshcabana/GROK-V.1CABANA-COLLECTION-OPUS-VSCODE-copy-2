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
    <main className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-[#6e6e73]">Shop</p>
            <h1 className="text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
              CABANA collection
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.1em] transition-colors',
                  activeFilter === filter.value
                    ? 'border-[#1d1d1f] bg-[#1d1d1f] text-white'
                    : 'border-[#d2d2d7] bg-white text-[#6e6e73] hover:text-[#1d1d1f]',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
