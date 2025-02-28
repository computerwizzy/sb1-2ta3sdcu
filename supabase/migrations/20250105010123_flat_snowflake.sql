/*
  # Fix Menu Items RLS Policies and Admin Permissions

  1. Changes
    - Drop and recreate RLS policies for menu_items table
    - Add proper admin role permissions
    - Ensure authenticated users with admin role can modify items
  
  2. Security
    - Enable RLS on menu_items table
    - Add policies for read and write access
    - Grant necessary permissions to roles
*/

-- First ensure RLS is enabled
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON menu_items;
DROP POLICY IF EXISTS "Only admins can modify menu items" ON menu_items;

-- Create policy for public read access
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Create separate policies for each operation type for admin users
CREATE POLICY "Admins can insert menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Grant necessary permissions
GRANT SELECT ON menu_items TO anon;
GRANT ALL ON menu_items TO authenticated;

-- Ensure the sequence permissions are granted
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;