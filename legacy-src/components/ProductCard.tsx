import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft transition hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-black/70">{product.category}</p>
        <h3 className="font-heading text-lg text-ink">{product.name}</h3>
        <p className="text-sm text-black/60">{product.shortDescription}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">AUD ${product.price}</span>
          <span className="text-xs text-black/70">{product.rating.toFixed(1)} ★</span>
        </div>
      </div>
    </Link>
  );
}
