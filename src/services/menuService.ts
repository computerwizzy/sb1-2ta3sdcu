import { supabase } from '../lib/supabase/client';
import { MenuItemType } from '../types/menu';

export const menuService = {
  getMenuItems: async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) throw error;
    return data as MenuItemType[];
  },

  updateMenuItem: async (id: string, updates: Partial<MenuItemType>) => {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as MenuItemType;
  },

  deleteMenuItem: async (id: string) => {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};