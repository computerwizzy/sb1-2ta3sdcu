import { AuthError } from './types';
import { AUTH_ERRORS } from './constants';

export function getAuthErrorMessage(error: unknown): AuthError {
  if (error instanceof Error) {
    return {
      message: error.message || AUTH_ERRORS.UNKNOWN_ERROR,
      status: 400
    };
  }
  
  return {
    message: AUTH_ERRORS.UNKNOWN_ERROR,
    status: 500
  };
}

export function isAdminUser(role?: string | null): boolean {
  return role === 'admin';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}