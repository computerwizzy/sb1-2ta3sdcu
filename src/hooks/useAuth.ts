import { useState, useCallback } from 'react';
import { auth } from '../lib/supabase/auth';
import type { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { session } = await auth.signIn(email, password);
      setSession(session);
      return session;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setSession(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const session = await auth.getSession();
      setSession(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check auth status');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    session,
    loading,
    error,
    signIn,
    signOut,
    checkAuth,
    clearError: () => setError(null)
  };
}