import {
  AuthError,
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  OAuthCredential,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { auth } from '../firebaseApp';

export async function signIn(
  provider: FacebookAuthProvider | GoogleAuthProvider
) {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return {
      user,
      error: null,
    };
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // const credential = FacebookAuthProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;
  } catch (error) {
    if (
      isAuthError(error) &&
      error.code === 'auth/account-exists-with-different-credential'
    ) {
      // The email of the user's account used.
      const email = error.customData.email;

      // preparePendingCred(error);

      return {
        user: null,
        error: {
          statusCode: 400,
          message: `An account already exists with this email: ${email}. Please sign in using another method.`,
        },
      };
      /* By default, Email Enumeration Protection is enabled in Firebase, which prevents revealing 
    whether an email exists in the Firebase Authentication system. This is a security measure to 
    avoid exposing the presence of accounts (i.e., email enumeration attacks), and that's why you're 
    seeing an empty array returned from fetchSignInMethodsForEmail() even if an email exists. */
    }

    return {
      user: null,
      error: { statusCode: 500, message: 'An unexpected error occurred.' },
    };
  }
}

export function preparePendingCred(error: AuthError) {
  // Get the pending Facebook credential
  const pendingCred: OAuthCredential | null =
    FacebookAuthProvider.credentialFromError(error);

  if (pendingCred) {
    storePendingCredential(pendingCred);
  }
}

export async function linkAuthProviders() {
  const pendingCred = retrievePendingCredential();
  if (pendingCred) {
    const user = await linkWithCredential(
      auth.currentUser as User,
      pendingCred
    );
    console.log('Successfully linked Facebook to Google account:', user);
  }
  removePendingCredential();
}

function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'code' in error;
}

function storePendingCredential(credential: OAuthCredential | null) {
  localStorage.setItem('pendingCred', JSON.stringify(credential));
}

function retrievePendingCredential() {
  const cred = localStorage.getItem('pendingCred');
  return cred ? JSON.parse(cred) : null;
}

function removePendingCredential() {
  localStorage.removeItem('pendingCred');
}
