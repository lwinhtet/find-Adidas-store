'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useAuthContext } from '@/hooks/useAuthContext';
import { logout } from '@/lib/firebase/auth/EmailPasswordAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const authContent = user ? (
    <>
      <Image
        src={user.photoURL ? user.photoURL : '/img/default_photo.jpg'}
        width={32}
        height={32}
        alt="Lwin logo"
        className="w-[32px] h-[32px] max-sm:w-[10px] max-sm:h-[10px] rounded-full"
        style={{
          width: '32px',
          height: '32px',
        }}
      />
      <Button variant="link" onClick={logout}>
        Logout
      </Button>
    </>
  ) : (
    <Button variant="link" onClick={() => router.push('/login')}>
      Login
    </Button>
  );

  return (
    <nav className="flex flex-row justify-between fixed z-50 w-full bg-main-2 top-0 left-0 px-6 py-4 lg:px-20 shadow-sm">
      <Link href="/" className="flex items-center gap-1">
        <p className="text-[26px] font-extrabold text-my-primary max-sm:hidden">
          Lwin
        </p>
      </Link>
      <div className="flex flex-row gap-5 justify-center items-center">
        {authContent}
      </div>
    </nav>
  );
};

export default Navbar;
