import { MenuItemType } from '../../types/menu';
import { STORAGE_KEYS } from '../constants';
import { initialMenuItems } from '../data/menuItems';

export const menuStorage = {
  getItems: (): MenuItemType[] => {
    const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    if (!items) {
      localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(initialMenuItems));
      return initialMenuItems;
    }
    return JSON.parse(items);
  },

  saveItem: (item: MenuItemType): void => {
    const items = menuStorage.getItems();
    const index = items.findIndex(i => i.id === item.id);
    
    if (index >= 0) {
      items[index] = item;
    } else {
      items.push({ ...item, id: crypto.randomUUID() });
    }
    
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  },

  deleteItem: (id: string): void => {
    const items = menuStorage.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(filteredItems));
  }
};