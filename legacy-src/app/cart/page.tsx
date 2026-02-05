'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStorage } from '../../lib/useCartStorage';

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCartStorage();

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl">Your Cart</h1>
        {items.length > 0 && (
          <button
            type="button"
            className="text-xs uppercase tracking-[0.2em] text-black/50"
            onClick={clear}
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="section-card p-8 text-center">
          <p className="text-black/60">Your cart is empty.</p>
          <Link href="/products" className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm text-white">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="section-card flex flex-col gap-4 p-4 md:flex-row md:items-center">
                {item.image && (
                  <div className="relative h-28 w-24 overflow-hidden rounded-2xl bg-white">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="font-heading text-lg">{item.name}</h2>
                  <p className="text-sm text-black/60">AUD ${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => updateQty(item.id, Number(event.target.value))}
                    className="w-16 rounded-full border border-black/10 px-3 py-1 text-sm"
                  />
                  <button
                    type="button"
                    className="text-xs uppercase tracking-[0.2em] text-black/50"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="section-card h-fit space-y-4 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">Summary</p>
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>AUD ${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-black/50">Shipping calculated at checkout.</p>
            <button className="w-full rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white">
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
