import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';

export default function Profile() {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await updateProfile(currentUser, {
        displayName: name,
      });
      // Force reload to update context/navbar if needed, or just show message
      setMessage('Profile updated successfully! Refreshing...');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setError('Failed to update profile.');
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-md mx-auto">
        <h1 className="font-serif text-3xl font-bold text-stone-700 mb-6">Your Profile</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <img
              src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email || 'User'}&background=f59e0b&color=fff`}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border border-stone-200 shadow-sm mb-4 object-cover"
            />
            <p className="text-stone-500 font-semibold">{currentUser.email}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
          )}
          {message && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4">{message}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-1">Email Address</label>
              <input
                type="email"
                value={currentUser.email}
                disabled
                className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
              />
              <p className="text-xs text-stone-400 mt-1">Email cannot be changed.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                placeholder="Your Name"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors mt-6"
            >
              {loading ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
