import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (val) => {
    setQuantity(q => Math.max(1, q + val));
  };

  const handleAddToCart = () => {
    // TODO: Implement cart logic (e.g., add to Firestore or local storage)
    alert('Added to cart! (Demo)');
  };

  const handleBuyNow = () => {
    // TODO: Implement buy logic (e.g., create order in Firestore)
    alert('Order placed! (Demo)');
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;
  if (!product) return null;

  const totalCost = (quantity * (product.priceINR || 0)).toLocaleString('en-IN');

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white/90 dark:bg-black/90 px-4 py-12">
      <motion.div className="max-w-xl w-full rounded-3xl shadow-2xl border border-green-100 dark:border-white p-8 flex flex-col items-center gap-6 bg-white dark:bg-black"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
        <img src={product.image || '/rice-default.png'} alt={product.name} className="w-48 h-48 object-cover rounded-2xl shadow-lg mb-4" />
        <div className="text-3xl font-extrabold text-green-900 dark:text-white mb-2 text-center">{product.name}</div>
        <div className="text-lg text-gray-700 dark:text-gray-200 mb-2 text-center">{product.description}</div>
        <div className="text-xl font-bold text-green-700 dark:text-green-200 mb-2">₹{product.priceINR} <span className="text-base text-gray-500">/kg</span></div>
        <div className="flex items-center gap-4 my-4">
          <button className="px-3 py-1 rounded-full bg-green-200 text-green-900 font-bold text-2xl" onClick={() => handleQuantityChange(-1)}>-</button>
          <span className="text-2xl font-bold">{quantity}</span>
          <button className="px-3 py-1 rounded-full bg-green-200 text-green-900 font-bold text-2xl" onClick={() => handleQuantityChange(1)}>+</button>
          <span className="text-lg text-gray-600 ml-2">kg</span>
        </div>
        <div className="text-2xl font-extrabold text-green-900 dark:text-white mb-2">Total: ₹{totalCost}</div>
        <div className="flex gap-6 mt-4">
          <button className="px-6 py-3 rounded-full bg-green-600 text-white font-bold text-lg shadow-lg hover:bg-green-700 transition" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="px-6 py-3 rounded-full bg-yellow-400 text-green-900 font-bold text-lg shadow-lg hover:bg-yellow-500 transition" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
        <button className="mt-6 underline text-green-700" onClick={() => navigate(-1)}>Back</button>
      </motion.div>
    </div>
  );
}
