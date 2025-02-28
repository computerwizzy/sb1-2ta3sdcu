import { supabase } from '../supabase';
import { AUTH_CONFIG } from './constants';

export async function getSessionData() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function refreshSessionIfNeeded() {
  const session = await getSessionData();
  if (!session) return null;

  const expiresAt = new Date(session.expires_at!).getTime();
  const now = Date.now();
  
  // Refresh if less than 5 minutes until expiration
  if (expiresAt - now < 5 * 60 * 1000) {
    const { data } = await supabase.auth.refreshSession();
    return data.session;
  }

  return session;
}

export function isSessionValid(lastActivity: number): boolean {
  return Date.now() - lastActivity <= AUTH_CONFIG.SESSION_TIMEOUT;
}

export async function clearSession() {
  await supabase.auth.signOut();
  localStorage.removeItem('lastActivity');
}