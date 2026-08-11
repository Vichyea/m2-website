export default function DishCard({ image, title, description, price }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow card-hover">
      <img src={image} alt={title} className="w-full h-52 object-cover" />
      <div className="p-5 text-left">
        <h3 className="font-serif text-lg font-bold text-stone-700 mb-1">{title}</h3>
        <p className="text-sm text-stone-400 mb-3">{description}</p>
        <span className="text-amber-500 font-bold">${price}</span>
      </div>
    </div>
  );
}
