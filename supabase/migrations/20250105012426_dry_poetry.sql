/*
  # Fix Menu RLS Policies

  1. Changes
    - Reset and simplify RLS policies for menu_items table
    - Add proper admin access policies
    - Grant necessary permissions
  
  2. Security
    - Maintain public read access
    - Ensure admin users can perform all operations
*/

-- Reset menu_items table RLS
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON menu_items;
DROP POLICY IF EXISTS "Admins can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can delete menu items" ON menu_items;
DROP POLICY IF EXISTS "Admin full access" ON menu_items;

-- Create simplified policies
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admin full access"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
    OR
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
    OR
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON menu_items TO anon;
GRANT ALL ON menu_items TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;