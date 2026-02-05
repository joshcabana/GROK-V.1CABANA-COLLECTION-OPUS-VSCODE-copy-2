'use client'

import { useState } from 'react'
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
  const [filter, setFilter] = useState<FilterValue>('all')
  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter)

  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Products</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
              Understated essentials
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors',
                  filter === item.value
                    ? 'border-[#1d1d1f] text-[#1d1d1f]'
                    : 'border-[#d2d2d7] text-[#6e6e73]'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
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
