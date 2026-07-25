'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import LoadingSkeleton from './LoadingSkeleton';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (adminOnly && !isAdmin) {
        router.replace('/dashboard');
      }
    }
  }, [loading, isAuthenticated, isAdmin, adminOnly, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <LoadingSkeleton variant="block" count={1} />
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
