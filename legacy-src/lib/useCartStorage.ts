'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItem } from './cart';

const storageKey = 'cabana.cart';
const eventName = 'cabana:cart:update';

type CartState = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
};

const readItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const emitUpdate = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(eventName));
};

export function useCartStorage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readItems());

    const handleSync = () => setItems(readItems());

    window.addEventListener('storage', handleSync);
    window.addEventListener(eventName, handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener(eventName, handleSync);
    };
  }, []);

  const writeItems = useCallback((next: CartItem[]) => {
    setItems(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    emitUpdate();
  }, []);

  const addItem = useCallback(
    (incoming: CartItem) => {
      const current = readItems();
      const existing = current.find((item) => item.id === incoming.id);
      const next = existing
        ? current.map((item) =>
            item.id === incoming.id
              ? { ...item, quantity: item.quantity + incoming.quantity }
              : item
          )
        : [...current, incoming];
      writeItems(next);
    },
    [writeItems]
  );

  const removeItem = useCallback(
    (id: string) => {
      const next = readItems().filter((item) => item.id !== id);
      writeItems(next);
    },
    [writeItems]
  );

  const updateQty = useCallback(
    (id: string, quantity: number) => {
      const next = readItems().map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      writeItems(next);
    },
    [writeItems]
  );

  const clear = useCallback(() => {
    writeItems([]);
  }, [writeItems]);

  const summary = useMemo<CartState>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items, itemCount, subtotal };
  }, [items]);

  return {
    ...summary,
    addItem,
    removeItem,
    updateQty,
    clear,
  };
}
