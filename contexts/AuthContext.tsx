'use client';

import LoadingPageIcon from '@/components/LoadingPageIcon';
import useUserLocation from '@/hooks/useUserLocation';
import { auth } from '@/lib/firebase/firebaseApp';
import { onAuthStateChanged, User } from 'firebase/auth';
import { headers } from 'next/headers';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthType = {
  user: User | null;
};

const initAuth = {
  user: null,
};

const AuthContext = createContext<AuthType>(initAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { locationPermission } = useUserLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (!locationPermission) {
          router.push('/location-permission');
        } else if (path === '/login' || path === '/signup') {
          router.push('/home');
        }
      } else {
        setUser(null);
        if (path === '/signup') {
          router.push('/signup');
        } else {
          router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <LoadingPageIcon /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
