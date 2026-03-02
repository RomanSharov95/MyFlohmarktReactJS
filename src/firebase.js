import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Исправлено: 720g вместо 72Og
  apiKey: "AIzaSyANn46JlFS7Z64tE720gHwKwdLY2fqZRng", 
  authDomain: "myflohmarkt-10216.firebaseapp.com",
  projectId: "myflohmarkt-10216",
  storageBucket: "myflohmarkt-10216.firebasestorage.app",
  messagingSenderId: "229533528982",
  appId: "1:229533528982:web:eea39d7f6f3fccfdd623b7",
  measurementId: "G-8W4L5HK9S0"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ЭКСПОРТЫ (Без них будет белый экран!)
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;