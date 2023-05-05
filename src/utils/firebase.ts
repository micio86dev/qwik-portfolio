import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env._FIREBASE_API_KEY,
  authDomain: `${env._FIREBASE_APP_NAME}.firebaseapp.com`,
  projectId: env._FIREBASE_APP_NAME,
  storageBucket: `${env._FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: env._FIREBASE_MESSAGING_SENDER_ID,
  appId: env._FIREBASE_APP_ID,
  databaseURL: env._FIREBASE_DB_URL,
  measurementId: env._FIREBASE_MEASURAMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);
