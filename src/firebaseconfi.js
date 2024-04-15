// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAokVqM-8Rbr8NziWpfR_45NKvLvpzplNk",
  authDomain: "ltnc-hk232-6e0b9.firebaseapp.com",
  projectId: "ltnc-hk232-6e0b9",
  storageBucket: "ltnc-hk232-6e0b9.appspot.com",
  messagingSenderId: "1092786486278",
  appId: "1:1092786486278:web:9ac96aaf88127642c25787",
  measurementId: "G-QJJZQYCBZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
