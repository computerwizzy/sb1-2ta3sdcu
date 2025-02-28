/*
  # Fix Authentication Setup

  1. Changes
    - Create admin user with proper schema
    - Set correct permissions and roles
    - Avoid setting generated columns

  2. Security
    - Uses secure password hashing
    - Sets proper admin role and metadata
*/

-- First, clean up any existing data
DO $$ 
BEGIN
  -- Remove existing user if present
  DELETE FROM auth.users 
  WHERE email = 'computerwizzy@ymail.com';

  -- Create new admin user with proper setup
  INSERT INTO auth.users (
    instance_id,
    id,
    email,
    encrypted_password,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    aud,
    is_super_admin
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'computerwizzy@ymail.com',
    crypt('071175paisano', gen_salt('bf')),
    jsonb_build_object(
      'provider', 'email',
      'providers', ARRAY['email'],
      'role', 'admin'
    ),
    '{}'::jsonb,
    now(),
    now(),
    'authenticated',
    'authenticated',
    true
  );

  -- Ensure admin role is properly set
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
  WHERE email = 'computerwizzy@ymail.com';
END $$;

-- Ensure proper RLS policies are in place
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
CREATE POLICY "Users can read own data"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Grant admin access
CREATE POLICY "Admins have full access"
  ON auth.users
  TO authenticated
  USING (raw_app_meta_data->>'role' = 'admin')
  WITH CHECK (raw_app_meta_data->>'role' = 'admin');