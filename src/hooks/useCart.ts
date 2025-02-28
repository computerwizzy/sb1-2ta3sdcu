import { create } from 'zustand';
import { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  itemCount: 0,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          itemCount: state.itemCount + 1,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        itemCount: state.itemCount + 1,
      };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
      itemCount: state.itemCount - state.items.find((i) => i.id === itemId)!.quantity,
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ),
      itemCount:
        state.itemCount -
        state.items.find((i) => i.id === itemId)!.quantity +
        quantity,
    })),
  clearCart: () => set({ items: [], itemCount: 0 }),
}));