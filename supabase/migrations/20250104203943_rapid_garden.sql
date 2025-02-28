/*
  # Add admin user

  1. Changes
    - Insert admin user with email 'wizzy' and password '071175paisano'
    - Grant admin role to the user
*/

-- Create admin user
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
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'wizzy',
  crypt('071175paisano', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  'admin'
);

-- Set admin role
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'wizzy';