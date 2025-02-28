const AUTH_KEY = 'admin_auth';
const ADMIN_PASSWORD = '071175paisano';

interface AuthSession {
  authenticated: boolean;
  timestamp: number;
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    const session: AuthSession = {
      authenticated: true,
      timestamp: Date.now()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function checkAuth(): boolean {
  const sessionStr = localStorage.getItem(AUTH_KEY);
  if (!sessionStr) return false;

  const session: AuthSession = JSON.parse(sessionStr);
  const sessionAge = Date.now() - session.timestamp;
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  if (sessionAge > maxAge) {
    logout();
    return false;
  }

  return session.authenticated;
}