/*
  # Update admin user with proper credentials and role
  
  1. Changes
    - Updates or creates admin user with correct email/password
    - Sets proper admin role and permissions
  2. Security
    - Ensures admin has proper role and metadata
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
      raw_app_meta_data = jsonb_build_object(
        'provider', 'email',
        'providers', ARRAY['email'],
        'role', 'admin'
      ),
      email_confirmed_at = now(),
      updated_at = now(),
      role = 'authenticated'
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
  END IF;
END $$;