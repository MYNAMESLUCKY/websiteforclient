import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

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
          // Use useNavigate to redirect to the product details page
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Enquire
          </motion.button>
      </div>
    </motion.div>
  );
} 