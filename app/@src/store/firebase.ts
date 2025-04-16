import { FirebaseApp, initializeApp } from "firebase/app";
import { create } from 'zustand'

interface UseFirebase {
  firebase: FirebaseApp | null,
  init: () => void
}

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID_KEY,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const useFirebase = create<UseFirebase>((set, get) => ({
  firebase: null,
  init: () => {
    const app = initializeApp(firebaseConfig);
    set({firebase: app});
  }
}));

export { useFirebase }