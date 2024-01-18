// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAUm952YyfGbTn2Ae1OG3wPd7Xp_6xgvLQ',
  authDomain: 'pt-nail-source.firebaseapp.com',
  projectId: 'pt-nail-source',
  storageBucket: 'pt-nail-source.appspot.com',
  messagingSenderId: '938310626221',
  appId: '1:938310626221:web:9a0f0e68e57a58882f0f24',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
