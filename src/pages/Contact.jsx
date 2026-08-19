import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Contact() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: currentUser?.email || '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await addDoc(collection(db, 'reservations'), {
        ...form,
        userId: currentUser?.uid || 'guest',
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-serif text-3xl font-bold text-stone-700 mb-3">Reservation Confirmed!</h2>
          <p className="text-stone-400 mb-2">Thank you, {form.name}. We look forward to seeing you.</p>
          <p className="text-sm text-stone-400">📅 {form.date} at {form.time} · 👥 {form.guests} guest(s)</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Banner */}
      <div className="bg-stone-900 text-white text-center py-16">
        <h1 className="font-serif text-4xl font-bold mb-2">Contact & Reserve</h1>
        <p className="text-stone-400">Book your table or get in touch with us</p>
      </div>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Reservation Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-700 mb-6">Make a Reservation</h2>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Full Name</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Email</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Phone</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="(855) XXX-XXXX"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-1">Date</label>
                    <input
                      type="date" name="date" value={form.date} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-1">Time</label>
                    <input
                      type="time" name="time" value={form.time} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Number of Guests</label>
                  <select
                    name="guests" value={form.guests} onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1">Special Requests</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows="3"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                    placeholder="Any dietary needs or special occasion?"
                  ></textarea>
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {loading ? 'Submitting...' : 'Reserve Table'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-700 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-stone-700 mb-1">📍 Address</h3>
                  <p className="text-stone-500">123 Toul Kork, Phnom Penh, Cambodia</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-700 mb-1">📞 Phone</h3>
                  <p className="text-stone-500">(855) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-700 mb-1">✉️ Email</h3>
                  <p className="text-stone-500">reservations@bayonbanquet.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-700 mb-1">🕐 Opening Hours</h3>
                  <p className="text-stone-500">Tuesday – Sunday<br />11:00 AM – 10:00 PM<br /><br />Closed on Mondays</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-stone-200 rounded-xl h-64 flex items-center justify-center">
                <p className="text-stone-400 text-sm">📍 Map — Toul Kork, Phnom Penh</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
