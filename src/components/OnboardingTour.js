import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: 'Our Promise: Trust',
    description: 'RiceCo is committed to building lasting relationships with our customers through honesty, transparency, and reliability. You can trust us to deliver only the best.'
  },
  {
    title: 'Unmatched Quality',
    description: 'Every grain of rice is carefully selected and processed to meet the highest standards. Our quality assurance ensures you get premium rice every time.'
  },
  {
    title: 'Customer Focus',
    description: 'Your satisfaction is our top priority. We listen, adapt, and go the extra mile to meet your needs, whether you are a family or a business.'
  },
  {
    title: 'Sustainable & Ethical',
    description: 'We support sustainable farming and ethical sourcing, ensuring a better future for our farmers, customers, and the planet.'
  }
];

export default function OnboardingTour({ open, onClose }) {
  const [step, setStep] = useState(0);
  const modalRef = useRef(null);

  // Trap focus inside modal
  useEffect(() => {
    if (!open) return;
    const focusable = modalRef.current.querySelectorAll('button');
    if (focusable.length) focusable[0].focus();
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="tour-overlay"
        className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        aria-describedby="onboarding-desc"
      >
        <motion.div
          ref={modalRef}
          className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-4 border border-green-200"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <h2 id="onboarding-title" className="text-2xl font-bold text-green-900 mb-2">{steps[step].title}</h2>
          <p id="onboarding-desc" className="text-gray-700 text-center mb-4">{steps[step].description}</p>
          <div className="flex gap-4 mt-2">
            {step < steps.length - 1 ? (
              <button
                className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                onClick={() => setStep(s => s + 1)}
              >
                Next
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                onClick={onClose}
              >
                Finish
              </button>
            )}
            <button
              className="px-4 py-2 rounded-full bg-gray-200 text-green-700 font-semibold hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="flex gap-1 mt-4" aria-label="Progress">
            {steps.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-green-600' : 'bg-green-200'}`}></span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 