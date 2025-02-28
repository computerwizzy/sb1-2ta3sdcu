-- Reset and properly configure auth schema
DO $$ 
BEGIN
  -- Clean up existing user and related data
  DELETE FROM auth.users WHERE email = 'computerwizzy@ymail.com';
  
  -- Ensure auth schema is properly configured
  CREATE SCHEMA IF NOT EXISTS auth;
  GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
  
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
    aud,
    confirmation_token,
    is_super_admin,
    last_sign_in_at
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
    'authenticated',
    encode(gen_random_bytes(32), 'base64'),
    true,
    now()
  );

  -- Ensure proper indexes exist
  CREATE INDEX IF NOT EXISTS users_instance_id_email_idx ON auth.users (instance_id, email);
  CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users (instance_id);
  
  -- Set up RLS
  ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
  
  -- Create policies
  DROP POLICY IF EXISTS "Users can read own data" ON auth.users;
  DROP POLICY IF EXISTS "Admins have full access" ON auth.users;
  
  CREATE POLICY "Users can read own data"
    ON auth.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  CREATE POLICY "Admins have full access"
    ON auth.users
    FOR ALL
    TO authenticated
    USING (raw_app_meta_data->>'role' = 'admin')
    WITH CHECK (raw_app_meta_data->>'role' = 'admin');
END $$;