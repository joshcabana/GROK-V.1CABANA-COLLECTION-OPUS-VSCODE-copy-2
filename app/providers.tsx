'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '../lib/cart';

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const storageKey = 'cabana.cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem: (incoming) =>
        setItems((prev) => {
          const existing = prev.find((item) => item.id === incoming.id);
          if (!existing) return [...prev, incoming];
          return prev.map((item) =>
            item.id === incoming.id
              ? { ...item, quantity: item.quantity + incoming.quantity }
              : item
          );
        }),
      removeItem: (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
      updateQty: (id, quantity) =>
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
}
