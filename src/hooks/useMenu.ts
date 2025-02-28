import { useState, useCallback } from 'react';
import { storage } from '../lib/storage';
import { MenuItemType } from '../types/menu';

export function useMenu() {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = storage.getMenuItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveItem = useCallback(async (item: MenuItemType) => {
    try {
      setLoading(true);
      storage.saveMenuItem(item);
      await loadItems();
    } catch (err) {
      setError('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  }, [loadItems]);

  const deleteItem = useCallback(async (id: string) => {
    try {
      setLoading(true);
      storage.deleteMenuItem(id);
      await loadItems();
    } catch (err) {
      setError('Failed to delete menu item');
    } finally {
      setLoading(false);
    }
  }, [loadItems]);

  return {
    items,
    loading,
    error,
    loadItems,
    saveItem,
    deleteItem,
    clearError: () => setError(null)
  };
}