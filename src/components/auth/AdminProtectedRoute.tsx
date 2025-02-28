import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { isAdmin } from '../../lib/auth/authService';

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, checkAuth } = useAdminAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session || !isAdmin(session.user)) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}