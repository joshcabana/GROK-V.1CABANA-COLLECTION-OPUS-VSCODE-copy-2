import type { Metadata } from 'next';
import { products } from '../../data/products';
import ProductsClient from '../../components/ProductsClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop CABANA men’s, women’s, and bundle sets. Sustainable essentials designed in Australia.',
};

type ProductsPageProps = {
  searchParams?: Promise<{ query?: string; category?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <ProductsClient
        products={products}
        initialQuery={resolved?.query}
        initialCategory={resolved?.category}
      />
    </div>
  );
}
