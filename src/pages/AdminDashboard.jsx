import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'guests'
  
  const [editingRes, setEditingRes] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', time: '', guests: '', message: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch reservations
        const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        setReservations(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));

        // Fetch total users
        const usersSnap = await getDocs(collection(db, 'users'));
        setTotalUsers(usersSnap.size);

      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await deleteDoc(doc(db, 'reservations', id));
        setReservations(reservations.filter(res => res.id !== id));
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  }

  function openEdit(res) {
    setEditingRes(res.id);
    setEditForm({ date: res.date, time: res.time, guests: res.guests, message: res.message || '' });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'reservations', editingRes), editForm);
      setReservations(reservations.map(res => 
        res.id === editingRes ? { ...res, ...editForm } : res
      ));
      setEditingRes(null);
    } catch (err) {
      console.error("Error updating:", err);
    }
  }

  // Calculate stats
  // We use local date string formatting to match HTML date inputs (YYYY-MM-DD)
  const todayStr = new Date().toLocaleDateString('en-CA'); // e.g. "2026-08-19"
  const todaysReservations = reservations.filter(res => res.date === todayStr).length;

  // Filter and Sort
  let displayedReservations = reservations.filter(res => 
    (res.name && res.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (res.email && res.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (sortOrder === 'oldest') {
    displayedReservations.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortOrder === 'newest') {
    displayedReservations.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortOrder === 'guests') {
    displayedReservations.sort((a, b) => Number(b.guests) - Number(a.guests));
  }

  return (
    <div className="min-h-screen bg-stone-50 py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-700">Admin Panel</h1>
            <p className="text-stone-400 mt-1">Manage all incoming reservations and users</p>
          </div>
          <div className="text-sm bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-semibold">
            Admin Access
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <p className="text-stone-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Reservations</p>
            <p className="text-4xl font-serif font-bold text-stone-700">{reservations.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
            <p className="text-stone-500 text-sm font-semibold uppercase tracking-wider mb-1">Today's Reservations</p>
            <p className="text-4xl font-serif font-bold text-stone-700">{todaysReservations}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <p className="text-stone-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Registered Users</p>
            <p className="text-4xl font-serif font-bold text-stone-700">{totalUsers}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-t-xl shadow-lg p-6 border-b border-stone-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-stone-500 font-semibold text-sm whitespace-nowrap">Sort By:</span>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">Date (Newest)</option>
              <option value="oldest">Date (Oldest)</option>
              <option value="guests">Guests (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg p-6">
          {loading ? (
            <p className="text-stone-400">Loading data...</p>
          ) : displayedReservations.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-stone-400">No reservations match your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 text-sm uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Customer</th>
                    <th className="pb-3 pr-4 font-semibold">Contact</th>
                    <th className="pb-3 pr-4 font-semibold whitespace-nowrap">Date & Time</th>
                    <th className="pb-3 pr-4 font-semibold">Guests</th>
                    <th className="pb-3 pr-4 font-semibold">Notes</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {displayedReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-stone-50 transition">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-stone-700">{res.name}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-stone-600">{res.email}</p>
                        {res.phone && <p className="text-sm text-stone-500">{res.phone}</p>}
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-stone-700 font-medium whitespace-nowrap">{res.date}</p>
                        <p className="text-sm text-stone-500">{res.time}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-semibold">
                          {res.guests}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-stone-500 max-w-xs truncate" title={res.message}>
                          {res.message || '-'}
                        </p>
                      </td>
                      <td className="py-4 text-right space-x-2 whitespace-nowrap">
                        <button onClick={() => openEdit(res)} className="text-sm text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded transition border border-transparent hover:border-blue-200">Edit</button>
                        <button onClick={() => handleDelete(res.id)} className="text-sm text-red-600 hover:text-red-800 font-semibold px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition border border-transparent hover:border-red-200">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingRes && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="font-serif text-2xl font-bold text-stone-700 mb-6">Edit Reservation</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Date</label>
                  <input type="date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Time</label>
                  <input type="time" value={editForm.time} onChange={e => setEditForm({...editForm, time: e.target.value})} className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1">Guests</label>
                <input type="number" min="1" value={editForm.guests} onChange={e => setEditForm({...editForm, guests: e.target.value})} className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1">Notes</label>
                <textarea rows="3" value={editForm.message} onChange={e => setEditForm({...editForm, message: e.target.value})} className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setEditingRes(null)} className="px-4 py-2 text-stone-500 hover:text-stone-700 font-semibold transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
