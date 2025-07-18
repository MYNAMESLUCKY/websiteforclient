import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchContactInfo() {
  const contactCol = collection(db, 'contact');
  const contactSnapshot = await getDocs(contactCol);
  const docs = contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return docs[0] || null;
} 