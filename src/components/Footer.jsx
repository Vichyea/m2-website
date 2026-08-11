import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="font-serif text-xl font-bold text-white">
              Bayon<span className="text-amber-500">Banquet</span>
            </Link>
            <p className="text-sm mt-3 leading-relaxed">Where every meal is a masterpiece, crafted with passion.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-amber-500 transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Opening Hours</h4>
            <p className="text-sm leading-relaxed">Tuesday – Sunday<br/>5:00 PM – 10:00 PM<br/><br/>Closed on Mondays</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm leading-relaxed">123 Toul Kork<br/>Phnom Penh, Cambodia<br/><br/>(855) 123-4567<br/>reservations@bayonbanquet.com</p>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-6 text-center text-xs">
          <p>&copy; 2026 BayonBanquet Fine Dining. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
