import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config';

// Public client with anon key
export const supabase = createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);

// Admin client with service role token
export const supabaseAdmin = createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.serviceRoleKey
);