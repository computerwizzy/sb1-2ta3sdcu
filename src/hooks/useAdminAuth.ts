import { useState, useCallback } from 'react';
import { authService } from '../services/auth';

interface AdminAuthState {
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export function useAdminAuth(): AdminAuthState {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.adminSignIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    authService.signOut();
  }, []);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      await authService.checkAdminAuth();
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    signIn,
    signOut,
    checkAuth,
    clearError: () => setError(null)
  };
}