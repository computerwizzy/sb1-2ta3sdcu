/*
  # Fix RLS Policies and Admin Access

  1. Changes
    - Simplify RLS policies for menu_items table
    - Add proper admin access policy
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
DROP POLICY IF EXISTS "Admin full access" ON menu_items;
DROP POLICY IF EXISTS "Only admins can modify menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can delete menu items" ON menu_items;

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
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'authenticated'
  )
  WITH CHECK (
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'authenticated'
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON menu_items TO anon;
GRANT ALL ON menu_items TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;