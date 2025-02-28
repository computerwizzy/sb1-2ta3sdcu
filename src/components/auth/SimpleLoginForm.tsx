import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';

export default function SimpleLoginForm() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, clearError, isAuthenticated } = useSimpleAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/menu');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    login(password);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Admin Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border 
            border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none 
            focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
          placeholder="Enter admin password"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border 
          border-transparent text-sm font-medium rounded-md text-white 
          bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-red-500"
      >
        Sign in
      </button>
    </form>
  );
}