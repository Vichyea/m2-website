import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllReservations() {
      try {
        const q = query(
          collection(db, 'reservations'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setReservations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Error fetching all reservations:', err);
      }
      setLoading(false);
    }
    fetchAllReservations();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-700">Admin Panel</h1>
            <p className="text-stone-400 mt-1">Manage all incoming reservations</p>
          </div>
          <div className="text-sm bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-semibold">
            Admin Access
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="font-serif text-xl font-bold text-stone-700 mb-6">All Reservations</h2>

          {loading ? (
            <p className="text-stone-400">Loading reservations...</p>
          ) : reservations.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-stone-400">No reservations found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 text-sm uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Customer</th>
                    <th className="pb-3 pr-4 font-semibold">Contact</th>
                    <th className="pb-3 pr-4 font-semibold">Date & Time</th>
                    <th className="pb-3 pr-4 font-semibold">Guests</th>
                    <th className="pb-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-stone-50 transition">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-stone-700">{res.name}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-stone-600">{res.email}</p>
                        {res.phone && <p className="text-sm text-stone-500">{res.phone}</p>}
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-stone-700 font-medium">{res.date}</p>
                        <p className="text-sm text-stone-500">{res.time}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-semibold">
                          {res.guests}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-stone-500 max-w-xs truncate" title={res.message}>
                          {res.message || '-'}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
