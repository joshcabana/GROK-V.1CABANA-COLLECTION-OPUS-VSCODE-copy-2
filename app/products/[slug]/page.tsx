import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import ProductDetail from './ProductDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) {
    return { title: 'Product Not Found — Cabana Collections' };
  }
  return {
    title: `${product.title} — Cabana Collections`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  if (resolvedParams.slug === 'womens-modal-set') {
    redirect('/products/womens-set');
  }

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Link
          href="/products"
          className="text-[#1d1d1f] underline decoration-[#d2d2d7] hover:decoration-[#1d1d1f] transition-colors"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  return <ProductDetail product={product} />;
}
