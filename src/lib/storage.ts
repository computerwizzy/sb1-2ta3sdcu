import { MenuItemType } from '../types/menu';

const STORAGE_KEYS = {
  MENU_ITEMS: 'menu_items',
  ADMIN_AUTH: 'admin_auth'
} as const;

const ADMIN_PASSWORD = '071175paisano';

export const storage = {
  // Menu operations
  getMenuItems: (): MenuItemType[] => {
    const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    return items ? JSON.parse(items) : [];
  },

  saveMenuItem: (item: MenuItemType): void => {
    const items = storage.getMenuItems();
    const index = items.findIndex(i => i.id === item.id);
    
    if (index >= 0) {
      items[index] = item;
    } else {
      items.push({ ...item, id: crypto.randomUUID() });
    }
    
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  },

  deleteMenuItem: (id: string): void => {
    const items = storage.getMenuItems();
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(filteredItems));
  },

  // Auth operations
  isAuthenticated: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  login: (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
};