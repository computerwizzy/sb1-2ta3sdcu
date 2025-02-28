import { create } from 'zustand';
import { login, logout, checkAuth } from '../lib/auth/simpleAuth';

interface SimpleAuthStore {
  isAuthenticated: boolean;
  error: string | null;
  login: (password: string) => void;
  logout: () => void;
  clearError: () => void;
}

export const useSimpleAuth = create<SimpleAuthStore>((set) => ({
  isAuthenticated: checkAuth(),
  error: null,
  login: (password: string) => {
    if (login(password)) {
      set({ isAuthenticated: true, error: null });
    } else {
      set({ error: 'Invalid password' });
    }
  },
  logout: () => {
    logout();
    set({ isAuthenticated: false });
  },
  clearError: () => set({ error: null })
}));