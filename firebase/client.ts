import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPpoNfESRLi7fB3VdocpY5pv_gu0LiUtU",
  authDomain: "brightview-app.firebaseapp.com",
  projectId: "brightview-app",
  storageBucket: "brightview-app.firebasestorage.app",
  messagingSenderId: "187801930119",
  appId: "1:187801930119:web:aca86b3883c1f3e6496b22",
  measurementId: "G-XZ3JRRMVNZ"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);