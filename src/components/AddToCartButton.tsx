'use client';

import { useCart } from '../app/providers';
import type { Product } from '../data/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
        })
      }
    >
      Add to cart
    </button>
  );
}
