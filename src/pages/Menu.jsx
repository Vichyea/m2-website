import { Link } from 'react-router-dom';
import DishCard from '../components/DishCard';

const categories = [
  {
  name: 'Starters',
  dishes: [
    { image: '/images/Amok.png', title: 'Amok Trey', description: 'A traditional Cambodian fish dish cooked with coconut milk, kroeung, and spices.', price: '5.00' },
    { image: '/images/NumI.png', title: 'Num I', description: 'Soft Khmer glutinous rice balls filled with palm sugar and served with coconut cream.', price: '1.00' },
    { image: '/images/LokLak.png', title: 'Lok Lak', description: 'Stir-fried tender beef served with fresh vegetables and a tangy lime and pepper sauce.', price: '8.00' },
  ],
},
{
  name: 'Main Courses',
  dishes: [
    { image: '/images/Samlar Kari.png', title: 'Samlor Kari', description: 'A flavorful Cambodian curry soup made with kroeung, coconut milk, vegetables, and pork.', price: '3.50' },
    { image: '/images/PorkAndRice.png', title: 'Bai Sach Chrouk', description: 'Grilled marinated pork served with steamed rice, pickled vegetables, and a light soup.', price: '5.00' },
    { image: '/images/Morn Dot.png', title: 'Morn Dot', description: 'Grilled chicken marinated with Cambodian spices and served with fresh vegetables and sauce.', price: '15.50' },
    { image: '/images/p\'hok dot.png', title: 'P\'hok Dot', description: 'A traditional Cambodian dish made with grilled meat, fresh herbs, and a flavorful dipping sauce.', price: '5.50' },
    { image: '/images/BokLhong.png', title: 'Bok Lhon', description: 'A fresh and spicy Cambodian salad made with papaya, vegetables, herbs, and a flavorful dressing.', price: '4.50' },
    { image: '/images/LokLak.png', title: 'Lok Lak', description: 'Stir-fried tender beef served with fresh vegetables and a tangy lime and pepper sauce.', price: '8.00' },
    { image: '/images/Ko Dot.png', title: 'Ko Dot', description: 'Grilled beef seasoned with Cambodian spices and served with fresh vegetables and dipping sauce.', price: '4.50' },
    { image: '/images/Amok.png', title: 'Amok Trey', description: 'A traditional Cambodian fish dish cooked with coconut milk, kroeung, and spices.', price: '5.00' },
  ],
},
{
  name: 'Desserts',
  dishes: [
    { image: '/images/Num Treap.png', title: 'Num Treap', description: 'A traditional Khmer sticky rice cake wrapped in banana leaves with a sweet and soft filling.', price: '2.00' },
    { image: '/images/Kh Jelley Desert.png', title: 'Cha Houy Teuk', description: 'A colorful Khmer jelly dessert served with sweet coconut milk and other toppings.', price: '1.50' },
    { image: '/images/Num Chak Kachan.png', title: 'Num Chak Kachan', description: 'A soft Cambodian layered cake made with rice flour, coconut milk, and palm sugar.', price: '1.50' },
    { image: '/images/NumI.png', title: 'Num Plae Ai', description: 'Soft rice flour dumplings filled with palm sugar and covered with grated coconut.', price: '1.50' },
  ],
},
{
  name: 'Drinks',
  dishes: [
    { image: '/images/Tuek Tnoat.png', title: 'Tuek Tnoat', description: 'A refreshing Cambodian drink made from natural palm sugar juice.', price: '1.00' },
    { image: '/images/SugarCane Juice.png', title: 'Sugar Cane Juice', description: 'A naturally sweet and refreshing drink made from freshly pressed sugar cane.', price: '0.70' },
    { image: '/images/Matcha Latte.png', title: 'Matcha Latte', description: 'A creamy drink made with smooth matcha and steamed milk.', price: '2.50' },
    { image: '/images/Cocktail.png', title: 'Cocktail', description: 'A refreshing mixed drink made with a combination of flavorful ingredients and fruit.', price: '3.50' },
    { image: '/images/CoconutMilk.png', title: 'Coconut Milk Shake', description: 'A creamy and refreshing shake made with coconut milk and blended with ice.', price: '3.00' },
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
