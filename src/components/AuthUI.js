import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function AuthUI() {
  const { user, login, signup, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      setOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Simple avatar (initial or icon)
  const avatar = user ? (
    <span className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-900 font-bold text-lg border-2 border-green-400 cursor-pointer">
      {user.email[0].toUpperCase()}
    </span>
  ) : (
    <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl border-2 border-green-300 cursor-pointer">
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
    </span>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(o => !o)} aria-label="Profile" className="focus:outline-none">
        {avatar}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-black border border-green-200 dark:border-white rounded-xl shadow-xl p-6 z-50 flex flex-col gap-3">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : user ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <span className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-green-900 font-bold text-2xl border-2 border-green-400">
                  {user.email[0].toUpperCase()}
                </span>
                <div className="text-green-700 font-semibold mt-2">{user.email}</div>
              </div>
              <button onClick={() => { setOpen(false); navigate('/profile'); }} className="px-4 py-2 rounded bg-green-100 text-green-800 font-bold hover:bg-green-200 transition mt-2 w-full">Profile</button>
              <button onClick={logout} className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition mt-2 w-full">Sign Out</button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                required
              />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition w-full">
                {isSignup ? 'Sign Up' : 'Sign In'}
              </button>
              <button type="button" onClick={() => setIsSignup(s => !s)} className="text-green-700 underline text-sm mt-1">
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
} 