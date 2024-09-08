import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const facebookAuthProvider = new FacebookAuthProvider();
facebookAuthProvider.addScope('email');
facebookAuthProvider.addScope('public_profile');
facebookAuthProvider.setCustomParameters({
  display: 'popup',
});

const googleAuthProvider = new GoogleAuthProvider();

export { facebookAuthProvider, googleAuthProvider };
