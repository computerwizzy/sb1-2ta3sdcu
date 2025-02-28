export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

export interface AuthError {
  message: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
}

export interface AuthCredentials {
  email: string;
  password: string;
}