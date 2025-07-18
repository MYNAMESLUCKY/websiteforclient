// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOu3Xfx8Xe77DDqxaqEZZFq4Zotips4Hg",
  authDomain: "eventflow-85373.firebaseapp.com",
  projectId: "eventflow-85373",
  storageBucket: "eventflow-85373.firebasestorage.app",
  messagingSenderId: "172157267811",
  appId: "1:172157267811:web:df576a4e815f11adf1ad56",
  measurementId: "G-7MCKX37B03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };