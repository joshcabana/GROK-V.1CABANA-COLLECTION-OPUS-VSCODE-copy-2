'use client';

import { useMemo, useState } from 'react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';

const categories = ['All', 'Men', 'Women', 'Sets'] as const;

type ProductsClientProps = {
  products: Product[];
  initialQuery?: string;
  initialCategory?: string;
};

export default function ProductsClient({
  products,
  initialQuery,
  initialCategory,
}: ProductsClientProps) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const [category, setCategory] = useState(initialCategory ?? 'All');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <div className="space-y-6">
      <div className="section-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl">Shop CABANA</h1>
            <p className="text-sm text-black/60">
              Curated essentials for men, women, and shared sets.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-black/10 px-4 py-2 text-sm md:w-64"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-full border px-4 py-1 text-xs uppercase tracking-[0.2em] transition ${
                category === cat
                  ? 'border-ink bg-ink text-white'
                  : 'border-black/10 text-black/60 hover:border-black/30'
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-black/70">
          {filtered.length} items
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
