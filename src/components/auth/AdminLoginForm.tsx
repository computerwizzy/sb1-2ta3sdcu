import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { validateEmail } from '../../lib/auth/utils';

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const { signIn, error, loading, clearError, session } = useAdminAuth();
  const [email, setEmail] = useState('computerwizzy@ymail.com');
  const [password, setPassword] = useState('071175paisano');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/admin/menu');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError('');

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    await signIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>
      </div>

      {(error || validationError) && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
          {validationError || error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white bg-red-600 
          hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-red-500 disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}