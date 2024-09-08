import { signIn } from '@/lib/firebase/auth/FacebookAndGoogleAuth';
import {
  facebookAuthProvider,
  googleAuthProvider,
} from '@/lib/firebase/auth/OAuthProviders';

export enum providerEnum {
  google = 'google',
  facebook = 'facebook',
}

const useFacebookAndGoogleAuth = () => {
  const handleFacebookGoogleSignIn = async (providerType: providerEnum) => {
    try {
      let provider;
      switch (providerType) {
        case providerEnum.google:
          provider = googleAuthProvider;
          break;
        case providerEnum.facebook:
          provider = facebookAuthProvider;
          break;
        default:
          console.error('Unknown provider');
          return;
      }

      return await signIn(provider);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleFacebookGoogleSignIn };
};

export default useFacebookAndGoogleAuth;
