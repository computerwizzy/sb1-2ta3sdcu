/*
  # Create menu items table

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image` (text)
      - `dietary` (text[])
      - `category` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  image text,
  dietary text[] DEFAULT '{}',
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items
  FOR SELECT
  TO public
  USING (true);

-- Allow write access only to authenticated users with admin role
CREATE POLICY "Only admins can modify menu items"
  ON menu_items
  USING (auth.jwt() ->> 'role' = 'admin');