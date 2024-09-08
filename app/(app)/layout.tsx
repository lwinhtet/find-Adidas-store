'use client';
import Navbar from '@/components/Navbar';
import { useAuthContext } from '@/hooks/useAuthContext';
import { ReactNode } from 'react';

const LayoutWithNav = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center mt-[72px]">
        {children}
      </section>
    </>
  );
};

export default LayoutWithNav;
