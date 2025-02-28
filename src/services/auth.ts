const ADMIN_CREDENTIALS = {
  email: 'computerwizzy@ymail.com',
  password: '071175paisano'
};

export const authService = {
  adminSignIn: async (email: string, password: string): Promise<void> => {
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      throw new Error('Invalid credentials');
    }
    localStorage.setItem('admin_auth', 'true');
  },

  signOut: (): void => {
    localStorage.removeItem('admin_auth');
  },

  checkAdminAuth: async (): Promise<boolean> => {
    return localStorage.getItem('admin_auth') === 'true';
  }
};