// Supabase configuration constants
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  serviceRoleKey: 'sbp_3866610c4f5761fd7171c530e9861a076de64f3d'
} as const;