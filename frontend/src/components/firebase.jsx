// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Change this to import.meta.env
  authDomain: "kaizen-auth-20ca9.firebaseapp.com",
  projectId: "kaizen-auth-20ca9",
  storageBucket: "kaizen-auth-20ca9.firebasestorage.app",
  messagingSenderId: "724742138483",
  appId: "1:724742138483:web:ef0e6d2696d5ef1cd89806",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // Pass app to getAuth
export const db = getFirestore(app);
export default app;
