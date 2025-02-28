import { useState, useCallback } from 'react';
import { MenuItemType } from '../types/menu';
import * as menuService from '../services/menuService';

export function useMenuItems() {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await menuService.fetchMenuItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    items,
    loading,
    error,
    loadItems,
    setItems
  };
}