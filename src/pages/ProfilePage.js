import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || '');
          setPhotoURL(data.photoURL || '');
        } else {
          setDisplayName(user.email.split('@')[0]);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setDoc(doc(db, 'users', user.uid), {
      displayName,
      photoURL,
      email: user.email,
    }, { merge: true });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setPhotoURL(url);
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-xl text-green-700 font-bold mb-4">Please sign in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <label htmlFor="profile-pic-upload" className="cursor-pointer">
        {photoURL ? (
          <img src={photoURL} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-green-400 mb-4" />
        ) : (
          <span className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center text-green-900 font-bold text-3xl border-2 border-green-400 mb-4">
            {user.email[0].toUpperCase()}
          </span>
        )}
        <input
          id="profile-pic-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </label>
      <form onSubmit={handleSave} className="flex flex-col items-center gap-4 w-full max-w-xs">
        <input
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-center text-lg font-semibold"
          placeholder="Display Name"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
        {success && <div className="text-green-600 font-semibold">Profile updated!</div>}
      </form>
      <div className="text-2xl font-bold text-green-900 mt-6 mb-2">{user.email}</div>
      <div className="text-gray-600 mb-6">Profile details and settings will appear here.</div>
      <button onClick={logout} className="px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition">Sign Out</button>
    </div>
  );
} 