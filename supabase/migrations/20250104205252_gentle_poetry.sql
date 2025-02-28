-- Enable email/password auth
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create admin role
CREATE ROLE admin;

-- Grant necessary permissions to admin role
GRANT USAGE ON SCHEMA public TO admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin;

-- Create policy for admin access
CREATE POLICY "Full access for admins"
  ON menu_items
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);