import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MobileNav({ open, onClose, navLinks }) {
  const navRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const focusable = navRef.current.querySelectorAll('button, a');
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
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 bg-black/40 flex justify-end"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <motion.nav
            ref={navRef}
            initial={{ x: 80 }}
            animate={{ x: 0 }}
            exit={{ x: 80 }}
            transition={{ type: 'tween', stiffness: 300, damping: 30 }}
            className="w-64 h-full bg-white shadow-xl flex flex-col p-8 gap-6"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="self-end text-2xl text-green-700 mb-4"
              onClick={onClose}
              aria-label="Close menu"
            >
              &times;
            </button>
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="text-lg font-semibold text-green-900 hover:text-green-600 transition"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 