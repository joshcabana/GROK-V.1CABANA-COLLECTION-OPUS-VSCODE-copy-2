'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartLineItem = {
  key: string
  productId: string
  slug: string
  title: string
  price: number
  image: string
  size: string
  colour: string
  quantity: number
}

type CartState = {
  items: CartLineItem[]
  isOpen: boolean
  addItem: (item: Omit<CartLineItem, 'key' | 'quantity'> & { quantity?: number }) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  openDrawer: () => void
  closeDrawer: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const key = `${item.productId}:${item.size}:${item.colour}`
        const quantityToAdd = item.quantity ?? 1
        const existing = get().items.find((line) => line.key === key)
        if (existing) {
          set({
            items: get().items.map((line) =>
              line.key === key
                ? { ...line, quantity: line.quantity + quantityToAdd }
                : line,
            ),
          })
          return
        }
        set({
          items: [
            ...get().items,
            {
              ...item,
              key,
              quantity: quantityToAdd,
            },
          ],
        })
      },
      removeItem: (key) => {
        set({ items: get().items.filter((line) => line.key !== key) })
      },
      updateQuantity: (key, quantity) => {
        const nextQuantity = Math.max(1, quantity)
        set({
          items: get().items.map((line) =>
            line.key === key ? { ...line, quantity: nextQuantity } : line,
          ),
        })
      },
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
    }),
    {
      name: 'cabana-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
