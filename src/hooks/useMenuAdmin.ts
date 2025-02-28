import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItemType } from '../types/menu';

export function useMenuAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveMenuItem = async (item: MenuItemType) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error: saveError } = await supabase
        .from('menu_items')
        .upsert({
          ...item,
          dietary: item.dietary || [],
          updated_at: new Date().toISOString()
        });

      if (saveError) throw saveError;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save menu item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error: deleteError } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete menu item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveMenuItem,
    deleteMenuItem,
    clearError: () => setError(null)
  };
}