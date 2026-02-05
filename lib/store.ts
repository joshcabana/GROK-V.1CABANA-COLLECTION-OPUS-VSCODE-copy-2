import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  key: string
  productId: string
  title: string
  price: number
  size: string
  colour: string
  image: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: Omit<CartItem, 'key' | 'quantity'> & { size: string; colour: string }) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  openDrawer: () => void
  closeDrawer: () => void
  clear: () => void
  itemCount: () => number
  subtotal: () => number
}

const storage = typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (item) => {
        const key = `${item.productId}:${item.size}:${item.colour}`
        const existing = get().items.find((entry) => entry.key === key)
        if (existing) {
          set({
            items: get().items.map((entry) =>
              entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry
            ),
          })
        } else {
          set({
            items: [
              ...get().items,
              {
                key,
                productId: item.productId,
                title: item.title,
                price: item.price,
                size: item.size,
                colour: item.colour,
                image: item.image,
                quantity: 1,
              },
            ],
          })
        }
      },
      removeItem: (key) => set({ items: get().items.filter((entry) => entry.key !== key) }),
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((entry) => entry.key !== key) })
          return
        }
        set({
          items: get().items.map((entry) =>
            entry.key === key ? { ...entry, quantity } : entry
          ),
        })
      },
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      clear: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cabana-cart',
      storage,
      partialize: (state) => ({ items: state.items }),
    }
  )
)
