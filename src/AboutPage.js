import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAbout } from './api/about';
import Skeleton from './components/Skeleton';

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  useEffect(() => {
    fetchAbout().then(setAbout);
  }, []);
  if (!about)
    return (
      <section className="w-full px-8 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <Skeleton className="w-64 h-12 mb-6" />
        <Skeleton className="w-96 h-6 mb-10" />
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-8 w-full">
          <div className="bg-white/80 rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center gap-4 max-w-md w-full">
            <Skeleton className="w-32 h-6 mb-2" />
            <Skeleton className="w-40 h-4 mb-2" />
            <Skeleton className="w-36 h-4" />
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col items-center gap-4 max-w-md w-full">
            <Skeleton className="w-32 h-6 mb-2" />
            <Skeleton className="w-60 h-4" />
          </div>
        </div>
      </section>
    );
  return (
    <section className="w-full px-8 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        About {about.company}
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 mb-10 max-w-2xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
        {about.mission}
      </motion.p>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-8">
        <motion.div
          className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-100 p-8 flex flex-col items-center gap-4 hover:shadow-2xl transition relative max-w-md ring-1 ring-green-200/40"
          style={{ boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10), 0 1.5px 6px 0 rgba(34,197,94,0.08)' }}
          whileHover={{ scale: 1.04, y: -6 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', stiffness: 120, damping: 14 }}
        >
          <div className="text-xl font-bold text-green-900 mb-2 drop-shadow-sm">Our Values</div>
          <ul className="mb-4 space-y-2">
            {about.values.map(v => (
              <li key={v} className="text-green-700 flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full inline-block" /> {v}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-100 p-8 flex flex-col items-center gap-4 hover:shadow-2xl transition relative max-w-md ring-1 ring-green-200/40"
          style={{ boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10), 0 1.5px 6px 0 rgba(34,197,94,0.08)' }}
          whileHover={{ scale: 1.04, y: -6 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', stiffness: 120, damping: 14, delay: 0.2 }}
        >
          <div className="text-xl font-bold text-green-900 mb-2 drop-shadow-sm">Our Story</div>
          <p className="text-gray-700 text-center">{about.story}</p>
        </motion.div>
      </div>
    </section>
  );
} 