import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchProducts() {
  const productsCol = collection(db, 'products');
  const productSnapshot = await getDocs(productsCol);
  return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 