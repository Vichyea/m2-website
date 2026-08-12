import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const q = query(
          collection(db, 'reservations'),
          where('userId', '==', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        
        // Sort on the client side to avoid needing a Firestore composite index
        const resData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        resData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setReservations(resData);
      } catch (err) {
        console.error('Error fetching reservations:', err);
      }
      setLoading(false);
    }
    fetchReservations();
  }, [currentUser.uid]);

  return (
    <div className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-stone-700">Dashboard</h1>
          <p className="text-stone-400 mt-1">Welcome, {currentUser.email}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="font-serif text-xl font-bold text-stone-700 mb-6">Your Reservations</h2>

          {loading ? (
            <p className="text-stone-400">Loading...</p>
          ) : reservations.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-stone-400">No reservations yet.</p>
              <p className="text-sm text-stone-300 mt-1">Visit the Contact page to book a table!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((res) => (
                <div key={res.id} className="border border-stone-200 rounded-lg p-5 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-stone-700">{res.name}</p>
                      <p className="text-sm text-stone-400 mt-1">📅 {res.date} at {res.time}</p>
                      <p className="text-sm text-stone-400">👥 {res.guests} guest(s)</p>
                      {res.message && <p className="text-sm text-stone-500 mt-2 italic">"{res.message}"</p>}
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
