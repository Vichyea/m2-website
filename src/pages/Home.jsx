import { Link } from 'react-router-dom';
import DishCard from '../components/DishCard';

const dishes = [
  {
    image: 'https://www.tasteofharmony.org.au/wp-content/uploads/2018/02/Curried-fish-scaled.jpg',
    title: 'Amok Trey',
    description: 'This delightful combination of fish with a rich spicy coconut-based custard, steamed in a creative cup made with banana leaves, is very unique and simply exquisite.',
    price: '9.99',
  },
  {
    image: 'https://thf.bing.com/th/id/R.c5844e5eb9da953d1afbc7c64d01043f?rik=8Ox2cRf1m8EU0w&pid=ImgRaw&r=0',
    title: 'Lok Lak',
    description: 'Tender beef strips in a savory sauce with fresh herbs and vegetables',
    price: '8.00',
  },
  {
    image: 'https://i.pinimg.com/originals/2b/ea/65/2bea65b22acaf1c16102750c8cf2b183.jpg',
    title: 'Num I',
    description: 'Khmer Glutinous Rice Ball Desserts are more like boba balls but made with rice flour. This dessert has two main elements: the rice balls and the coconut cream sauce with which the Glutinous Rice Balls are dressed.',
    price: '1.00',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg relative min-h-screen flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
            Experience The Best Khmer Food in Town
          </h1>
          <p className="text-lg text-stone-200 mb-8">
            You can enjoy your favorite food and we will deliver it as you want. Also you can reserve a table for you and your loved ones to enjoy the food together.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
          >
            Reserve a Table
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-stone-700 mb-3">Why Choose BayonBanquet</h2>
          <p className="text-stone-400 text-lg mb-12">Everything we do is guided by a passion for exceptional Khmer dishes</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🍽️', title: 'Fine Cuisine', desc: 'Award-winning chefs using the finest seasonal ingredients.' },
              { icon: '🍷', title: 'Curated Drinks', desc: "Over 200 labels hand-picked from the world's finest vineyards." },
              { icon: '✨', title: 'Good Khmer Food', desc: 'A warm, intimate setting for every memorable occasion.' },
              { icon: '👨🍳', title: 'Expert Service', desc: 'Attentive team ensuring your comfort from arrival to dessert.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 shadow card-hover">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-lg font-bold text-stone-700 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-stone-700 mb-3">Signature Creations</h2>
          <p className="text-stone-400 text-lg mb-12">A glimpse of what awaits you at our table</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dishes.map((dish) => (
              <DishCard key={dish.title} {...dish} />
            ))}
          </div>
          <Link
            to="/menu"
            className="inline-block mt-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-stone-900 text-white text-center py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-4">Ready for an Unforgettable Khmer Meal?</h2>
          <p className="text-stone-400 text-lg mb-8">Book your table today and let us take care of the rest.</p>
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
