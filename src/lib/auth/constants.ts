export const AUTH_CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_ATTEMPTS: 5
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid login credentials. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  SIGNOUT_ERROR: 'Failed to sign out. Please try again.',
  RATE_LIMIT: 'Too many login attempts. Please try again later.'
};

export const AUTH_ROUTES = {
  LOGIN: '/admin/login',
  ADMIN_MENU: '/admin/menu'
} as const;