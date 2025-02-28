import { supabase } from '../supabase';
import { AuthCredentials, AuthUser } from './types';
import { AUTH_ERRORS } from './constants';

export async function signInWithEmail({ email, password }: AuthCredentials): Promise<AuthUser> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);

    return {
      id: data.user.id,
      email: data.user.email!,
      role: data.user.app_metadata?.role
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
  }
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(AUTH_ERRORS.SIGNOUT_ERROR);
}

export async function getCurrentSession(): Promise<AuthUser | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  return {
    id: session.user.id,
    email: session.user.email!,
    role: session.user.app_metadata?.role
  };
}