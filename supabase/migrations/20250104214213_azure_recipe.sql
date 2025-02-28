/*
  # Authentication System Fix

  1. Updates
    - Clean up existing auth setup
    - Create proper admin user
    - Set up correct RLS policies
*/

-- First ensure we have the required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clean up any existing admin user
DELETE FROM auth.users 
WHERE email = 'computerwizzy@ymail.com';

-- Create the admin user with correct metadata
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

-- Update the user's role to admin
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'computerwizzy@ymail.com';

-- Ensure RLS is enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create or replace the RLS policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can read own data" ON auth.users;
  DROP POLICY IF EXISTS "Admins have full access" ON auth.users;
  
  -- Create new policies
  CREATE POLICY "Users can read own data"
    ON auth.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  CREATE POLICY "Admins have full access"
    ON auth.users
    TO authenticated
    USING (raw_app_meta_data->>'role' = 'admin')
    WITH CHECK (raw_app_meta_data->>'role' = 'admin');
END $$;