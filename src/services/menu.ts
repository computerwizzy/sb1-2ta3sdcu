import { MenuItemType } from '../types/menu';
import { menuStorage } from '../lib/storage/menu';

export const menuService = {
  getMenuItems: async (): Promise<MenuItemType[]> => {
    return menuStorage.getItems();
  },

  saveMenuItem: async (item: MenuItemType): Promise<void> => {
    menuStorage.saveItem(item);
  },

  deleteMenuItem: async (id: string): Promise<void> => {
    menuStorage.deleteItem(id);
  }
};