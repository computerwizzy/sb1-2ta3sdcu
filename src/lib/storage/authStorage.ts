import { AUTH_CONFIG, STORAGE_KEYS } from '../constants';

export const authStorage = {
  isAuthenticated: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  login: (password: string): boolean => {
    if (password === AUTH_CONFIG.ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
};