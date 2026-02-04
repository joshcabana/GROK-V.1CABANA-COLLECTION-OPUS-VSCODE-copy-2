import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '../../../data/products';
import AddToCartButton from '../../../components/AddToCartButton';
import ReviewList from '../../../components/ReviewList';

export const generateStaticParams = async () =>
  products.map((product) => ({ slug: product.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(1, 3).map((image) => (
              <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                <Image src={image} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">{product.category}</p>
            <h1 className="mt-2 font-heading text-3xl md:text-4xl">{product.name}</h1>
            <p className="mt-3 text-sm text-black/60">{product.description}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-lg font-semibold">AUD ${product.price}</span>
            <span className="text-black/50">
              {product.rating.toFixed(1)} ★ ({product.reviewCount} reviews)
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">Sizes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span key={size} className="rounded-full border border-black/10 px-3 py-1 text-xs">
                  {size}
                </span>
              ))}
            </div>
          </div>
          <AddToCartButton product={product} />
          <div className="section-card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">Details</p>
            <ul className="mt-3 space-y-2 text-sm text-black/60">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="section-card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">Materials & Care</p>
            <p className="mt-3 text-sm text-black/60">{product.materials.join(' · ')}</p>
            <ul className="mt-2 space-y-2 text-sm text-black/60">
              {product.care.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">Reviews</p>
          <h2 className="font-heading text-3xl">Customer love</h2>
        </div>
        <ReviewList />
      </section>
    </div>
  );
}
