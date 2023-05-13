import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyABpuFPfONf_rGLYJwW4HAiiJjBH3IAJec',
  authDomain: 'social-media-46f31.firebaseapp.com',
  projectId: 'social-media-46f31',
  storageBucket: 'social-media-46f31.appspot.com',
  messagingSenderId: '270180149603',
  appId: '1:270180149603:web:8c422e220b598f08be8b56',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
