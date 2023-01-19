// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword,signInWithRedirect, signOut} from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)



// Google Authentication 
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
    
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



// Email & Password
const logInWithEmailAndPassword = async (email, password) => {
  try { 
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Sign Out
const  logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    console.error(error)
  }
};

// Exports 

export {
  app,
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logout,
};

