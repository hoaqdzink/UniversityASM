import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore'
import {
  getAuth ,
  createUserWithEmailAndPassword ,
  signOut ,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAokVqM-8Rbr8NziWpfR_45NKvLvpzplNk",
  authDomain: "ltnc-hk232-6e0b9.firebaseapp.com",
  projectId: "ltnc-hk232-6e0b9",
  storageBucket: "ltnc-hk232-6e0b9.appspot.com",
  messagingSenderId: "1092786486278",
  appId: "1:1092786486278:web:9ac96aaf88127642c25787",
  measurementId: "G-QJJZQYCBZ9"
};

initializeApp(firebaseConfig)
// init service
const auth = getAuth()



//log in log out
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('success to log in');
    })
    .catch((err) => {
      alert('error to log in');
    });
    
});
