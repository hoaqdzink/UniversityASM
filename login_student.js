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
    apiKey: "AIzaSyAfVRofw5x_q-vhDqXVSlDMT0KxiHSh518",
    authDomain: "admin-d28ce.firebaseapp.com",
    projectId: "admin-d28ce",
    storageBucket: "admin-d28ce.appspot.com",
    messagingSenderId: "109895513467",
    appId: "1:109895513467:web:f9c59f370698d1e71ef9de",
    measurementId: "G-G8QLE6W4LW"
  }

initializeApp(firebaseConfig)
// init service
const db = getFirestore()
const auth = getAuth()


// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred)=>{
      console.log('user created', cred.user)
      signupForm.reset()
    })
    .catch((err)=>{
      console.log(err.message)
    })
})

//log in log out
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('the user sign out');
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user logged in', cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login');

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
          const response = await fetch('http://127.0.0.1:5500/dist/success.html', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (response.ok) {
              alert('Đăng nhập thành công!');
              window.location.href = '/dashboard';
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
      }
  });
});
