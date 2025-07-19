import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Toast from './Toast';

export default function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState('');

  const handleEnquire = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'orderEnquiries'), {
        product: product.name,
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });
      setToast(true);
      setModalOpen(false);
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setError('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-transparent w-full"
      whileHover={{ scale: 1.04, y: -6, rotateX: 8, rotateY: 8 }}
      whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      style={{ perspective: 1000 }}
    >
      <Toast message="Enquiry submitted!" show={toast} onClose={() => setToast(false)} />
      <div className="flex flex-col items-center gap-3">
        {/* Cute rice mascot */}
        <svg width="48" height="60" viewBox="0 0 48 60">
          <defs>
            <linearGradient id="prodGrain" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fffbe9" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <path d="M24,56 Q8,40 12,16 Q24,4 36,16 Q40,40 24,56" fill="url(#prodGrain)" stroke="#eab308" strokeWidth="2" />
          <ellipse cx="20" cy="38" rx="2" ry="3" fill="#444" />
          <ellipse cx="28" cy="38" rx="2" ry="3" fill="#444" />
          <path d="M21,44 Q24,47 27,44" stroke="#eab308" strokeWidth="1.2" fill="none" />
        </svg>
        {/* Product image placeholder */}
        <div className="w-20 h-20 bg-green-100 rounded-xl flex items-center justify-center mb-2">
          <img src={product.image} alt={`Image of ${product.name}`} className="object-contain w-16 h-16" loading="lazy" />
        </div>
        <div className="text-lg font-bold text-green-900 text-center">{product.name}</div>
        <div className="text-xs text-green-600 font-semibold mb-1">{product.type}</div>
        <div className="text-gray-600 text-sm text-center mb-2">{product.description}</div>
        <div className="text-green-700 font-bold text-base mb-2">${product.price} /kg</div>
        <motion.button
          whileHover={{ scale: 1.08, backgroundColor: '#22c55e', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full border border-green-600 text-green-700 font-semibold transition bg-white hover:bg-green-600 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={`Enquire about ${product.name}`}
          tabIndex={0}
          role="button"
          onClick={() => setModalOpen(true)}
        >
          Enquire
        </motion.button>
        {/* Enquiry Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <form
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4 w-full max-w-md border border-green-200"
              onSubmit={handleEnquire}
            >
              <div className="text-xl font-bold text-green-900 mb-2">Enquire about {product.name}</div>
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[80px]"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-green-700 font-bold hover:bg-gray-300 transition"
                  onClick={() => setModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
} 