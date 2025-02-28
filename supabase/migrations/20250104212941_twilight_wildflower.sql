/*
  # Fix Authentication Setup

  1. Changes
    - Clean up existing user data
    - Create admin user with correct schema
    - Set proper role and permissions

  2. Security
    - Uses secure password hashing
    - Sets admin role in metadata
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
END $$;