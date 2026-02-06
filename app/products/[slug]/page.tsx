import { products } from '@/data/products'
import ProductDetail from './ProductDetail'
import Link from 'next/link'

interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = params instanceof Promise ? await params : params
  const product = products.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
        <Link
          href="/products"
          className="text-ink underline decoration-line hover:decoration-ink transition-colors"
        >
          Back to Shop
        </Link>
      </main>
    )
  }

  return <ProductDetail product={product} />
}
