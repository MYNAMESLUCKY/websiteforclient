import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const about = {
  company: "RiceCo",
  mission: "Delivering the finest rice from the best fields to your table.",
  values: ["Quality First", "Sustainable Farming", "Customer Focus"],
  story: "Founded by passionate rice farmers, RiceCo has grown into a global supplier trusted by thousands. We blend tradition with innovation to bring you the best rice, every time."
};

const contact = {
  phone: "+91-9876543210",
  email: "info@riceco.com",
  address: "123 Rice Lane, Grainville, India",
  message: "Have questions or want to get in touch? Fill out the form below and our team will get back to you soon."
};

async function seed() {
  await addDoc(collection(db, "about"), about);
  console.log("Added About info");
  await addDoc(collection(db, "contact"), contact);
  console.log("Added Contact info");
  console.log("Seeding complete!");
}

seed(); 