import { AUTH_CONFIG } from './constants';

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now });
    return true;
  }

  if (now - entry.timestamp > AUTH_CONFIG.RATE_LIMIT_WINDOW) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= AUTH_CONFIG.RATE_LIMIT_ATTEMPTS) {
    return false;
  }

  rateLimitMap.set(identifier, {
    count: entry.count + 1,
    timestamp: entry.timestamp
  });
  return true;
}

export function resetRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier);
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}