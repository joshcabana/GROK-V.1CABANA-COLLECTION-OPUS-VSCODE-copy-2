import type { Metadata } from 'next';
import { products } from '../../data/products';
import ProductsClient from '../../components/ProductsClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop CABANA men’s, women’s, and bundle sets. Sustainable essentials designed in Australia.',
};

type ProductsPageProps = {
  searchParams?: { query?: string; category?: string };
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <ProductsClient
        products={products}
        initialQuery={searchParams?.query}
        initialCategory={searchParams?.category}
      />
    </div>
  );
}
