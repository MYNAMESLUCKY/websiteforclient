import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchContactInfo } from './api/contact';
import Toast from './components/Toast';

export default function ContactPage() {
  const [contact, setContact] = useState(null);
  const [toast, setToast] = useState(false);
  useEffect(() => {
    fetchContactInfo().then(setContact);
  }, []);
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    setToast(true);
  }, []);
  if (!contact) return null;
  return (
    <section className="w-full px-8 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <Toast message="Thank you for contacting us!" show={toast} onClose={() => setToast(false)} />
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Contact Us
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 mb-10 max-w-2xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
        {contact.message}
      </motion.p>
      <div className="mb-8 text-center text-green-700">
        <div><b>Phone:</b> {contact.phone}</div>
        <div><b>Email:</b> {contact.email}</div>
        <div><b>Address:</b> {contact.address}</div>
      </div>
      <motion.form
        className="bg-white/80 rounded-2xl shadow-lg border border-green-100 p-8 flex flex-col gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <textarea
          placeholder="Your Message"
          className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 min-h-[100px]"
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.08, backgroundColor: '#22c55e', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full border border-green-600 text-green-700 font-semibold transition bg-white hover:bg-green-600 hover:text-white cursor-pointer mt-2"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
} 