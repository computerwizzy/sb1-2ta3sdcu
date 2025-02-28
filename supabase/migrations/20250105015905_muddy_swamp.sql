-- Reset menu_items table RLS
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON menu_items;
DROP POLICY IF EXISTS "Admin full access" ON menu_items;

-- Create new policies
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Policy for admin operations (insert, update, delete)
CREATE POLICY "Admin full access"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (
    auth.role() = 'authenticated' AND 
    (
      auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR
      auth.jwt() ->> 'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    (
      auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR
      auth.jwt() ->> 'role' = 'admin'
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON menu_items TO anon;
GRANT ALL ON menu_items TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;