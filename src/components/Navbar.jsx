import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  async function handleLogout() {
    try { await logout(); } catch (e) { console.error(e); }
  }

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <Link to="/" className="font-serif text-2xl font-bold text-stone-700">
          Bayon<span className="text-amber-500">Banquet</span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center gap-1.5 text-stone-600 font-semibold text-sm"
          aria-label="Toggle navigation"
        >
          ☰ <span>Menu</span>
        </button>

        {/* Nav links */}
        <nav className={`${
          open ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row gap-0 md:gap-8 absolute md:static top-full left-0 right-0 bg-white md:bg-transparent border-b md:border-0 border-stone-200 shadow-md md:shadow-none z-40`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`nav-link font-semibold text-sm text-stone-600 px-6 py-3 md:px-0 md:py-0 border-b md:border-b-0 border-stone-100 ${isActive(link.to)}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth links */}
          {currentUser ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-6 py-3 md:px-0 md:py-0 border-b md:border-b-0 border-stone-100">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className={`nav-link font-semibold text-sm text-stone-600 ${isActive('/dashboard')}`}
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-3 md:pl-2">
                <img
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email || 'User'}&background=f59e0b&color=fff`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-stone-200 shadow-sm"
                />
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="font-semibold text-sm text-stone-600 hover:text-amber-500 transition-colors text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="px-6 py-3 md:px-0 md:py-0 md:pl-2 border-b md:border-b-0 border-stone-100">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
