import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGwAj8vban7p4WeJw3Lz3abe2M6XddNw8",
  authDomain: "myflohmarkt-10216.firebaseapp.com",
  projectId: "myflohmarkt-10216",
  storageBucket: "myflohmarkt-10216.firebasestorage.app",
  messagingSenderId: "229533528982",
  appId: "1:229533528982:web:e42906d60f455e75d623b7",
  measurementId: "G-NRDLDH5ZMF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);