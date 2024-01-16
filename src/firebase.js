// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBzr8HXIEK7WfHNRdSpkoCXY7HOVQeMCdM',
  authDomain: 'admin-template-418cd.firebaseapp.com',
  projectId: 'admin-template-418cd',
  storageBucket: 'admin-template-418cd.appspot.com',
  messagingSenderId: '526278693446',
  appId: '1:526278693446:web:ec5d3cd07fba7447637047',
  measurementId: 'G-VVQGGRTH7H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
