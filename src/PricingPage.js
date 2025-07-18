import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPricing } from './api/pricing';
import Skeleton from './components/Skeleton';

export default function PricingPage() {
  const [plans, setPlans] = useState(null);
  useEffect(() => {
    fetchPricing().then(setPlans);
  }, []);
  return (
    <section className="w-full px-8 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Pricing Plans
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 mb-10 max-w-2xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
        Choose the best plan for your needs. Transparent pricing, no hidden fees.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {plans
          ? plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-100 p-8 flex flex-col items-center gap-4 hover:shadow-2xl transition relative ring-1 ring-green-200/40"
                style={{ boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10), 0 1.5px 6px 0 rgba(34,197,94,0.08)' }}
                whileHover={{ scale: 1.04, y: -6 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 * i }}
              >
                <div className="text-2xl font-bold text-green-900 mb-2 drop-shadow-sm">{plan.name}</div>
                <div className="text-4xl font-extrabold text-green-700 mb-4 drop-shadow">${plan.price}</div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="text-green-700 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block" /> {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.08, backgroundColor: '#22c55e', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full border border-green-600 text-green-700 font-semibold transition bg-white/80 hover:bg-green-600 hover:text-white cursor-pointer shadow-md"
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-100 p-8 flex flex-col items-center gap-4 ring-1 ring-green-200/40">
                <Skeleton className="w-24 h-8 mb-2" />
                <Skeleton className="w-20 h-10 mb-4" />
                <div className="mb-6 space-y-2 w-full">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-28 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="w-28 h-8" />
              </div>
            ))}
      </div>
    </section>
  );
} 