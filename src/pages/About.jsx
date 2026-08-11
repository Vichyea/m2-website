import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      {/* Page Banner */}
      <div className="bg-stone-900 text-white text-center py-16">
        <h1 className="font-serif text-4xl font-bold mb-2">About Us</h1>
        <p className="text-stone-400">Our story, our people, our passion</p>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Inside the restaurant"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-700 mb-5">A Passion for the Table</h2>
              <p className="mb-4 leading-relaxed text-stone-600">BayonBanquet is a culinary journey that celebrates the rich flavors and traditions of Cambodia and Southeast Asia.</p>
              <p className="mb-4 leading-relaxed text-stone-600">Nestled in the heart of Phnom Penh City, we invite you to experience the vibrant culture and exquisite cuisine of Cambodia. We have been serving authentic Khmer dishes for over a decade.</p>
              <Link
                to="/menu"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Explore Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold text-stone-700 mb-3">What We Stand For</h2>
          <p className="text-stone-400 text-lg mb-12">The principles behind every plate</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Fresh & Local', desc: 'We partner with local farms to bring the finest seasonal produce to your plate every day.' },
              { icon: '🎨', title: 'Creative Excellence', desc: 'Classical technique meets modern creativity to deliver dishes that surprise and delight.' },
              { icon: '🤝', title: 'Genuine Hospitality', desc: 'Great service means making every guest feel like the only guest in the room.' },
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
    </>
  );
}
