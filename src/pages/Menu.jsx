import { Link } from 'react-router-dom';
import DishCard from '../components/DishCard';

const categories = [
  {
    name: 'Appetizers',
    dishes: [
      { image: '/images/Amok.png', title: 'Amok Trey', description: 'Fish with rich spicy coconut-based custard, steamed in banana leaves.', price: '9.99' },
      { image: '/images/NumI.png', title: 'Num I', description: 'Khmer Glutinous Rice Ball Desserts with coconut cream sauce.', price: '1.00' },
      { image: '/images/LokLak.png', title: 'Lok Lak', description: 'Tender beef strips in a savory sauce with fresh herbs and vegetables.', price: '8.00' },
    ],
  },
  {
    name: 'Main Courses',
    dishes: [
      { image: '/images/Samlar Kari.png', title: 'Samlor Korko', description: 'A traditional Khmer soup with rich kroeung paste, vegetables and pork.', price: '7.50' },
      { image: '/images/PorkAndRice.png', title: 'Bai Sach Chrouk', description: 'Grilled pork with rice, a beloved Cambodian breakfast dish.', price: '5.00' },
      { image: '/images/Morn Dot.png', title: 'Kuy Teav', description: 'Cambodian noodle soup with pork broth, herbs, and bean sprouts.', price: '4.50' },
    ],
  },
  {
    name: 'Desserts',
    dishes: [
      { image: '/images/Num Treap.png', title: 'Num Ansom', description: 'Sticky rice cake with banana or pork, wrapped in banana leaves.', price: '2.00' },
      { image: '/images/Kh Jelley Desert.png', title: 'Cha Houy Teuk', description: 'Khmer jelly dessert made with agar and coconut milk.', price: '1.50' },
      { image: '/images/Num Chak Kachan.png', title: 'Num Plae Ai', description: 'Sweet dumplings in warm coconut milk with palm sugar.', price: '1.50' },
    ],
  },
];

export default function Menu() {
  return (
    <>
      {/* Page Banner */}
      <div className="bg-stone-900 text-white text-center py-16">
        <h1 className="font-serif text-4xl font-bold mb-2">Our Menu</h1>
        <p className="text-stone-400">Authentic Khmer cuisine crafted with love</p>
      </div>

      {/* Menu Sections */}
      {categories.map((cat) => (
        <section key={cat.name} className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-bold text-stone-700 mb-8 text-center">{cat.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cat.dishes.map((dish) => (
                <DishCard key={dish.title} {...dish} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-stone-900 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-4">Craving Something Special?</h2>
          <p className="text-stone-400 text-lg mb-8">Reserve your table and let us serve you an unforgettable meal.</p>
          <Link
            to="/contact"
            className="inline-block border-2 border-white hover:bg-white hover:text-stone-900 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
          >
            Make a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
