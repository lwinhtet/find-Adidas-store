'use client';
import { useAuthContext } from '@/hooks/useAuthContext';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  if (user) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      {children}
    </section>
  );
};

export default AuthLayout;
