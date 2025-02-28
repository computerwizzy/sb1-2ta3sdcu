/*
  # Fix Menu Items RLS Policies

  1. Changes
    - Update RLS policies for menu_items table
    - Grant proper permissions to authenticated users with admin role
    - Allow public read access to menu items
  
  2. Security
    - Enable RLS on menu_items table
    - Add policies for read and write access
*/

-- First ensure RLS is enabled
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON menu_items;
DROP POLICY IF EXISTS "Only admins can modify menu items" ON menu_items;

-- Create policy for public read access
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Create policy for admin write access
CREATE POLICY "Only admins can modify menu items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Grant necessary permissions
GRANT SELECT ON menu_items TO anon;
GRANT ALL ON menu_items TO authenticated;