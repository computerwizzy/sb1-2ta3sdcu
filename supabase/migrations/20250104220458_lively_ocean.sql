-- Reset and properly configure auth schema
DO $$ 
BEGIN
  -- Clean up existing user and related data
  DELETE FROM auth.users WHERE email = 'computerwizzy@ymail.com';
  
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
    confirmation_token
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
    encode(gen_random_bytes(32), 'base64')
  );

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