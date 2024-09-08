import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseApp';
import { FirebaseError } from 'firebase/app';

export async function signUp(email: string, password: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user, error: null };
  } catch (e) {
    if (e instanceof FirebaseError) {
      let errorMessage = '';

      // Handle specific error codes from Firebase
      switch (e.code) {
        case 'auth/email-already-in-use':
          errorMessage =
            'This email address is already in use. Please try logging in or use a different email.';
          // const credential = EmailAuthProvider.credential(email, password);
          // console.log(8888, e.customData, e.credential);
          //   const pendingCred: OAuthCredential | null =
          //   FacebookAuthProvider.credentialFromError(error);

          // if (pendingCred) {
          //   storePendingCredential(pendingCred);
          // }
          break;
        case 'auth/invalid-email':
          errorMessage =
            'The email address is invalid. Please check and try again.';
          break;
        case 'auth/weak-password':
          errorMessage =
            'The password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = 'An unknown error occurred. Please try again.';
          break;
      }

      return {
        user: null,
        error: { statusCode: 400, message: errorMessage },
      };
    }

    // Handle non-Firebase errors
    return {
      user: null,
      error: { statusCode: 500, message: 'An unexpected error occurred.' },
    };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { user, error: null };
  } catch (e) {
    if (e instanceof FirebaseError) {
      let errorMessage = '';

      // Handle specific error codes from Firebase for sign-in
      switch (e.code) {
        case 'auth/user-not-found':
          errorMessage =
            'No user found with this email address. Please check your email or sign up.';
          break;
        case 'auth/wrong-password':
          errorMessage =
            'Incorrect password. Please try again or reset your password.';
          break;
        case 'auth/too-many-requests':
          errorMessage =
            'Too many failed attempts. Please try again later or reset your password.';
          break;
        case 'auth/user-disabled':
          errorMessage =
            'This account has been disabled. Please contact support for assistance.';
          break;
        case 'auth/invalid-email':
          errorMessage =
            'The email address is invalid. Please check and try again.';
          break;
        default:
          errorMessage =
            'An unknown error occurred during sign-in. Please try again.';
          break;
      }

      return {
        user: null,
        error: { statusCode: 400, message: errorMessage },
      };
    }

    // Handle non-Firebase errors
    return {
      user: null,
      error: { statusCode: 500, message: 'An unexpected error occurred.' },
    };
  }
}

export async function logout() {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
      // Sign-out successful.
    })
    .catch((err) => {
      // An error happened.
      console.error('Error signing out', err);
    });
}
