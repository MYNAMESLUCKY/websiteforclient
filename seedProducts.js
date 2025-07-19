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

const products = [
  {
    name: "Basmati Supreme",
    type: "Long Grain",
    description: "Aromatic, fluffy, perfect for biryani and pilaf.",
    price: 2.99,
    priceINR: 250,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
  },
  {
    name: "Jasmine Delight",
    type: "Fragrant Rice",
    description: "Soft, slightly sticky, delicately floral.",
    price: 2.49,
    priceINR: 210,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046876.png",
  },
  {
    name: "Brown Health",
    type: "Whole Grain",
    description: "Nutritious, hearty, rich in fiber.",
    price: 2.19,
    priceINR: 180,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046861.png",
  },
  {
    name: "Sushi Pearl",
    type: "Short Grain",
    description: "Sticky, glossy, ideal for sushi rolls.",
    price: 3.29,
    priceINR: 270,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046867.png",
  },
  {
    name: "Golden Sella",
    type: "Parboiled",
    description: "Golden, firm, holds shape after cooking.",
    price: 2.79,
    priceINR: 230,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046872.png",
  },
  {
    name: "Wild Harmony",
    type: "Wild Rice Blend",
    description: "Earthy, nutty, visually striking.",
    price: 3.99,
    priceINR: 320,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046863.png",
  },
];

async function seed() {
  for (const product of products) {
    await addDoc(collection(db, "products"), product);
    console.log(`Added: ${product.name}`);
  }
  console.log("Seeding complete!");
}

seed();
