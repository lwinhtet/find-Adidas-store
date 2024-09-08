'use client';

import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import useEmailPasswordAuth from '@/hooks/useEmailPasswordAuth';
// import dynamic from 'next/dynamic';
import useUserLocation from '@/hooks/useUserLocation';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthResponseType } from '@/types/AuthResponseType';
import GoogleAndFacebookAuth from '../GoogleAndFacebookAuth';

const SignUp = () => {
  const { email, setEmail, password, setPassword, handleSignUp } =
    useEmailPasswordAuth();
  const { locationPermission } = useUserLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await handleSignUp();
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
      <h2 className="text-xl font-extrabold text-left mb-6">
        Create new account
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
              className="col-span-5 md:col-span-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-700">{errorMessage}</div>
          )}
          <Button type="submit" className="mt-2">
            Sign Up
          </Button>
        </div>
      </form>
      <GoogleAndFacebookAuth setErrorMessage={setErrorMessage} />
      <Button
        variant="link"
        className="block mx-auto text-center text-xs text-gray-500 underline"
        onClick={() => {
          router.push('/login');
        }}
      >
        Login to an existing account
      </Button>
    </div>
  );
};

export default SignUp;
