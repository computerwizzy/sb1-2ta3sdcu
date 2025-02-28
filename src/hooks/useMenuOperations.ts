import { useState } from 'react';
import { MenuItemType } from '../types/menu';
import { supabase } from '../lib/supabase';

export function useMenuOperations(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Authentication required');
    }
    return session;
  };

  const saveItem = async (item: MenuItemType) => {
    setLoading(true);
    setError(null);
    
    try {
      await checkAuth();
      
      const { error: saveError } = await supabase
        .from('menu_items')
        .upsert({
          ...item,
          dietary: item.dietary || [],
          updated_at: new Date().toISOString()
        });

      if (saveError) throw saveError;
      onSuccess?.();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save menu item';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await checkAuth();
      
      const { error: deleteError } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      onSuccess?.();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete menu item';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveItem,
    deleteItem,
    clearError: () => setError(null)
  };
}