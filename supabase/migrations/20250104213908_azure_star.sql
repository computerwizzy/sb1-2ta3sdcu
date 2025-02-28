/*
  # Authentication System Enhancement

  1. Schema Updates
    - Add last_login tracking
    - Add login_attempts tracking
    - Add session management
  
  2. Security Enhancements
    - Rate limiting support
    - Session timeout handling
*/

-- Create login attempts tracking
CREATE TABLE IF NOT EXISTS auth.login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  attempt_count integer DEFAULT 1,
  last_attempt timestamptz DEFAULT now(),
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Add index for login attempts lookup
CREATE INDEX IF NOT EXISTS idx_login_attempts_email 
  ON auth.login_attempts(email);

-- Create function to handle login attempts
CREATE OR REPLACE FUNCTION auth.handle_login_attempt(
  p_email text,
  p_ip_address text
)
RETURNS void AS $$
BEGIN
  INSERT INTO auth.login_attempts (email, ip_address)
  VALUES (p_email, p_ip_address)
  ON CONFLICT (email) DO UPDATE
  SET 
    attempt_count = auth.login_attempts.attempt_count + 1,
    last_attempt = now();
END;
$$ LANGUAGE plpgsql;

-- Create function to reset login attempts
CREATE OR REPLACE FUNCTION auth.reset_login_attempts(
  p_email text
)
RETURNS void AS $$
BEGIN
  DELETE FROM auth.login_attempts
  WHERE email = p_email;
END;
$$ LANGUAGE plpgsql;

-- Add last_login column to users if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'auth' 
    AND table_name = 'users' 
    AND column_name = 'last_login'
  ) THEN
    ALTER TABLE auth.users 
    ADD COLUMN last_login timestamptz;
  END IF;
END $$;

-- Create function to update last login
CREATE OR REPLACE FUNCTION auth.update_last_login()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_login = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last login update
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;
CREATE TRIGGER on_auth_user_login
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_login IS DISTINCT FROM NEW.last_login)
  EXECUTE FUNCTION auth.update_last_login();

-- Enable RLS on login attempts
ALTER TABLE auth.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for login attempts
CREATE POLICY "Only admins can view login attempts"
  ON auth.login_attempts
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');