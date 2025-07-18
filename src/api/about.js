import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchAbout() {
  const aboutCol = collection(db, 'about');
  const aboutSnapshot = await getDocs(aboutCol);
  const docs = aboutSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return docs[0] || null;
} 