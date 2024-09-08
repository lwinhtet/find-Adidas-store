import { signIn, signUp } from '@/lib/firebase/auth/EmailPasswordAuth';
import { useState } from 'react';

const useEmailPasswordAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      return await signUp(email, password);
      // if (error) {
      //   return console.log(error);
      // }
      // console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = async () => {
    try {
      return await signIn(email, password);

      // if (error) {
      //   return console.log(error);
      // }

      // console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    handleSignIn,
  };
};

export type UseEmailPasswordAuthType = ReturnType<typeof useEmailPasswordAuth>;

export default useEmailPasswordAuth;
