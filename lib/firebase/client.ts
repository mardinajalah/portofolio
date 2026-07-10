import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const defaultFirebaseAppName = '[DEFAULT]';
const publicContactFirebaseAppName = 'public-contact';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

const getExistingFirebaseApp = (name: string) => {
  return getApps().find((app) => app.name === name);
};

const assertFirebaseConfigured = () => {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase client environment variables are not configured.');
  }
};

export const getFirebaseApp = (): FirebaseApp => {
  assertFirebaseConfigured();

  return getExistingFirebaseApp(defaultFirebaseAppName) ?? initializeApp(firebaseConfig);
};

export const getFirebaseAuth = (): Auth => {
  return getAuth(getFirebaseApp());
};

export const getFirebaseDb = (): Firestore => {
  return getFirestore(getFirebaseApp());
};

export const getPublicContactFirebaseApp = (): FirebaseApp => {
  assertFirebaseConfigured();

  return getExistingFirebaseApp(publicContactFirebaseAppName)
    ?? initializeApp(firebaseConfig, publicContactFirebaseAppName);
};

export const getPublicContactFirebaseAuth = (): Auth => {
  return getAuth(getPublicContactFirebaseApp());
};

export const getPublicContactFirebaseDb = (): Firestore => {
  return getFirestore(getPublicContactFirebaseApp());
};
