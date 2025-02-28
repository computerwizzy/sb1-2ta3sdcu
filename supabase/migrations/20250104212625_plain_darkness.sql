/*
  # Fix admin user setup

  1. Changes
    - Remove confirmed_at from INSERT as it's a generated column
    - Ensure proper role and metadata setup
    - Clean up existing user first to avoid conflicts
*/

DO $$ 
BEGIN
  -- Clean up existing user if exists
  DELETE FROM auth.users 
  WHERE email = 'computerwizzy@ymail.com';

  -- Create new admin user
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
      'providers', ARRAY['email'],
      'role', 'admin'
    ),
    '{}'::jsonb,
    now(),
    now(),
    'authenticated',
    'authenticated'
  );

  -- Ensure admin role is set
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
  WHERE email = 'computerwizzy@ymail.com';
END $$;