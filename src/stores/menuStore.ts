import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItemType } from '../types/menu';
import { menuData } from '../data/menuData';

// Convert initial menu data to flat array
const initialItems = [
  ...menuData.chinese,
  ...menuData.japanese,
  ...menuData.sushi,
  ...menuData.drinks
];

interface MenuStore {
  items: MenuItemType[];
  initialized: boolean;
  initialize: () => void;
  updateItem: (updatedItem: MenuItemType) => void;
  addItem: (newItem: MenuItemType) => void;
  deleteItem: (id: string) => void;
}

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      items: initialItems,
      initialized: false,
      initialize: () => set({ initialized: true }),
      updateItem: (updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ),
        })),
      addItem: (newItem) =>
        set((state) => ({
          items: [...state.items, { ...newItem, id: crypto.randomUUID() }],
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'menu-storage',
    }
  )
);