/*
  # Add Google Sheets sync tracking to newsletter subscriptions

  1. Changes
    - Add synced_to_sheets column to newsletter_subscriptions table
    - Add index for faster querying of unsynced subscriptions
*/

-- Add synced_to_sheets column
ALTER TABLE newsletter_subscriptions 
ADD COLUMN IF NOT EXISTS synced_to_sheets boolean DEFAULT false;

-- Add index for synced status
CREATE INDEX IF NOT EXISTS idx_newsletter_sheets_sync 
ON newsletter_subscriptions(synced_to_sheets) 
WHERE synced_to_sheets = false;