import { authStorage } from '../lib/storage/authStorage';

export const authService = {
  login: (password: string): boolean => {
    return authStorage.login(password);
  },

  logout: (): void => {
    authStorage.logout();
  },

  isAuthenticated: (): boolean => {
    return authStorage.isAuthenticated();
  }
};