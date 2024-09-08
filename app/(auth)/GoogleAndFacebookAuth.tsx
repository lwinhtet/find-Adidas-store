'use client';

import { Button } from '@/components/ui/button';
import useFacebookAndGoogleAuth, {
  providerEnum,
} from '@/hooks/useFacebookAndGoogleAuth';
import useUserLocation from '@/hooks/useUserLocation';
import { AuthResponseType } from '@/types/AuthResponseType';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

type PropsType = {
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};

const GoogleAndFacebookAuth = ({ setErrorMessage }: PropsType) => {
  const { handleFacebookGoogleSignIn } = useFacebookAndGoogleAuth();
  const { locationPermission } = useUserLocation();
  const router = useRouter();

  const handleSignIn = async (providerType: providerEnum) => {
    const result = await handleFacebookGoogleSignIn(providerType);
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
    <div className="flex flex-row mb-4 gap-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={() => handleSignIn(providerEnum.google)}
      >
        <svg
          role="img"
          className="mr-2 h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Google</title>
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={() => handleSignIn(providerEnum.facebook)}
      >
        <svg
          role="img"
          className="mr-2 h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Facebook</title>
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
        </svg>
      </Button>
    </div>
  );
};

export default GoogleAndFacebookAuth;
