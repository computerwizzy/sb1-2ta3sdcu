import { supabase } from '../supabase';
import { AuthError } from './types';
import { AUTH_ERRORS } from './constants';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    if (!data.session) throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    
    return data.session;
  } catch (error) {
    console.error('Sign in error:', error);
    throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error(AUTH_ERRORS.SIGNOUT_ERROR);
  }
}

export async function getSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export function isAdmin(user: any): boolean {
  if (!user) return false;
  
  return (
    user.app_metadata?.role === 'admin' ||
    user.role === 'admin' ||
    user.raw_app_metadata?.role === 'admin'
  );
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Refresh session error:', error);
    return null;
  }
}