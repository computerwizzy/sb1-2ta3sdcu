/*
  # Create admin user

  1. Changes
    - Clean up existing user if present
    - Create new admin user with proper credentials
    - Set admin role in app metadata

  2. Security
    - Uses secure password hashing
    - Sets proper role and permissions
*/

DO $$ 
BEGIN
  -- Clean up existing user if exists
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
    aud
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
    'authenticated'
  );

  -- Ensure admin role is set
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
  WHERE email = 'computerwizzy@ymail.com';
END $$;