'use client';

import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import useEmailPasswordAuth from '@/hooks/useEmailPasswordAuth';
// import dynamic from 'next/dynamic';
import useUserLocation from '@/hooks/useUserLocation';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GoogleAndFacebookAuth from '../GoogleAndFacebookAuth';
import { AuthResponseType } from '@/types/AuthResponseType';

// Dynamically import FirebaseAuth to avoid Next.js SSR issues
/* FirebaseUI uses browser APIs, and in the context of Next.js, you'll need to ensure 
it only initializes on the client side to avoid server-side rendering (SSR) issues. */
// const GoogleAndFacebookSignUpButton = dynamic(
//   () => import('./GoogleAndFacebookSignUpButton'),
//   {
//     ssr: false,
//   }
// );

const Login = () => {
  const { email, setEmail, password, setPassword, handleSignIn } =
    useEmailPasswordAuth();
  const { locationPermission } = useUserLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await handleSignIn();
    if (result) redirectAfterLogin(result);
    if (result && result.error) setErrorMessage(result.error.message);
  };

  const redirectAfterLogin = (result: AuthResponseType) => {
    if (result && result.user) {
      if (locationPermission !== 'granted') {
        router.push('/location-permission');
        return;
      } else {
        router.push('/home');
        return;
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-black font-extrabold text-left mb-6">
        Login to your account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="email" className="hidden md:block text-left">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="lwin@gmail.com"
              className="col-span-5 md:col-span-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="password" className="hidden md:block text-left">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="password"
              className="col-span-5 md:col-span-4 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-700">{errorMessage}</div>
          )}
          <Button type="submit" className="mt-2">
            Login
          </Button>
        </div>
      </form>
      <GoogleAndFacebookAuth setErrorMessage={setErrorMessage} />

      <Button
        variant="link"
        className="block mx-auto text-center text-xs text-gray-500 underline"
        onClick={() => {
          router.push('/signup');
        }}
      >
        Create new account
      </Button>
    </div>
  );
};

export default Login;
