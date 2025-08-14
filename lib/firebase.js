import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCze7FouChhuIaZWIxQjM_nhSWv0-K1wBA",
  authDomain: "productionpage-df224.firebaseapp.com",
  projectId: "productionpage-df224",
  storageBucket: "productionpage-df224.firebasestorage.app",
  messagingSenderId: "217188025370",
  appId: "1:217188025370:web:0b3bed60512a3db19d7da3",
  measurementId: "G-LTCYN5TMCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };