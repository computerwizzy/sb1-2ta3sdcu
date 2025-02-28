/*
  # Authentication Setup Fix

  1. Changes
    - Create admin user with correct schema
    - Set proper permissions and roles
    - Avoid generated columns issues

  2. Security
    - Proper password hashing
    - Admin role configuration
    - RLS policies
*/

-- First, ensure we have the proper extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Clean up function to safely remove existing user
CREATE OR REPLACE FUNCTION clean_up_user(p_email TEXT)
RETURNS void AS $$
BEGIN
  DELETE FROM auth.users WHERE email = p_email;
END;
$$ LANGUAGE plpgsql;

-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user(
  p_email TEXT,
  p_password TEXT
)
RETURNS uuid AS $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Generate new UUID for user
  v_user_id := gen_random_uuid();
  
  -- Insert new admin user
  INSERT INTO auth.users (
    id,
    instance_id,
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
    v_user_id,
    '00000000-0000-0000-0000-000000000000',
    p_email,
    crypt(p_password, gen_salt('bf')),
    jsonb_build_object(
      'provider', 'email',
      'providers', ARRAY['email']::text[],
      'role', 'admin'
    ),
    '{}'::jsonb,
    now(),
    now(),
    'authenticated',
    'authenticated',
    true
  );

  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql;

-- Execute the user setup
DO $$
BEGIN
  -- Clean up existing user
  PERFORM clean_up_user('computerwizzy@ymail.com');
  
  -- Create new admin user
  PERFORM create_admin_user('computerwizzy@ymail.com', '071175paisano');
END $$;

-- Set up RLS policies
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND schemaname = 'auth' 
    AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON auth.users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Grant admin full access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND schemaname = 'auth' 
    AND policyname = 'Admins have full access'
  ) THEN
    CREATE POLICY "Admins have full access"
      ON auth.users
      TO authenticated
      USING (raw_app_meta_data->>'role' = 'admin')
      WITH CHECK (raw_app_meta_data->>'role' = 'admin');
  END IF;
END $$;