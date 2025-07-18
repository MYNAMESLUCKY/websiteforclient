import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function fetchPricing() {
  const pricingCol = collection(db, 'pricing');
  const pricingSnapshot = await getDocs(pricingCol);
  return pricingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 