// import {
//   FacebookAuthProvider,
//   GoogleAuthProvider,
// } from 'firebase/auth/web-extension';
// import * as firebaseui from 'firebaseui';
// import { auth } from './firebaseApp';

// const uiConfig = {
//   signInFlow: 'popup',
//   signInSuccessUrl: '/home',
//   tosUrl: '/terms-of-service',
//   privacyPolicyUrl: '/privacy-policy',
//   callbacks: {
//     signInSuccessWithAuthResult: (authResult: unknown) => {
//       if (authResult) {
//         return true;
//       }
//       return false;
//     },
//     signInFailure: function (error) {
//       console.error('Sign-in failure:', error);
//     },
//     uiShown: () => {
//       console.log('UI shown');
//     },
//   },
//   signInOptions: [
//     // GoogleAuthProvider.PROVIDER_ID,
//     // FacebookAuthProvider.PROVIDER_ID,
//     {
//       provider: GoogleAuthProvider.PROVIDER_ID,
//       scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
//       customParameters: {
//         // Forces account selection even when one account
//         // is available.
//         prompt: 'select_account',
//       },
//     },
//     {
//       provider: FacebookAuthProvider.PROVIDER_ID,
//       scopes: ['public_profile', 'email'],
//     },
//   ],
//   // credentialHelper: firebaseui.auth.CredentialHelper.NONE,
// };

// const firebaseUi =
//   firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

// export { firebaseUi, uiConfig };
