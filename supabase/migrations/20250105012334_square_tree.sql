/*
  # Fix Admin Authentication

  1. Changes
    - Reset admin user with correct metadata
    - Update RLS policies for menu_items table
    - Grant necessary permissions
  
  2. Security
    - Ensure admin user has correct role and metadata
    - Set up proper RLS policies for menu items
*/

-- First ensure we have the required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clean up any existing admin user
DELETE FROM auth.users 
WHERE email = 'computerwizzy@ymail.com';

-- Create the admin user with proper configuration
INSERT INTO auth.users (
  instance_id,
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'computerwizzy@ymail.com',
  crypt('071175paisano', gen_salt('bf')),
  now(),
  jsonb_build_object(
    'provider', 'email',
    'providers', ARRAY['email']::text[],
    'role', 'admin'
  ),
  '{}'::jsonb,
  now(),
  now(),
  'authenticated',
  'authenticated'
);

-- Reset menu_items table RLS
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Menu items are viewable by everyone" ON menu_items;
DROP POLICY IF EXISTS "Admins can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Admins can delete menu items" ON menu_items;

-- Create new policies
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO PUBLIC
  USING (true);

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
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON menu_items TO anon;
GRANT ALL ON menu_items TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;