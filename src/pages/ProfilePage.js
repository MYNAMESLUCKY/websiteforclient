import React from 'react';
import { useAuth } from '../components/AuthProvider';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-xl text-green-700 font-bold mb-4">Please sign in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center text-green-900 font-bold text-3xl border-2 border-green-400 mb-4">
        {user.email[0].toUpperCase()}
      </span>
      <div className="text-2xl font-bold text-green-900 mb-2">{user.email}</div>
      <div className="text-gray-600 mb-6">Profile details and settings will appear here.</div>
      <button onClick={logout} className="px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition">Sign Out</button>
    </div>
  );
} 