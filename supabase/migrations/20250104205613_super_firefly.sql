/*
  # Update admin user credentials
  
  1. Changes
    - Updates existing admin user's password if exists
    - Creates new admin user if not exists
  2. Security
    - Sets proper role and permissions for admin access
*/

DO $$ 
BEGIN
  -- Update existing user if exists
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'computerwizzy@ymail.com'
  ) THEN
    UPDATE auth.users
    SET 
      encrypted_password = crypt('071175paisano', gen_salt('bf')),
      raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb,
      updated_at = now()
    WHERE email = 'computerwizzy@ymail.com';
  ELSE
    -- Create new admin user if doesn't exist
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
      '{"provider": "email", "providers": ["email"], "role": "admin"}'::jsonb,
      '{}'::jsonb,
      now(),
      now(),
      'authenticated',
      'authenticated'
    );
  END IF;
END $$;