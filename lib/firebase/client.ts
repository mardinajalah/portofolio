import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

export const getFirebaseApp = (): FirebaseApp => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase client environment variables are not configured.');
  }

  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
};

export const getFirebaseAuth = (): Auth => {
  return getAuth(getFirebaseApp());
};

export const getFirebaseDb = (): Firestore => {
  return getFirestore(getFirebaseApp());
};
