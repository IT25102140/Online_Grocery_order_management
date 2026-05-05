import { Link } from 'react-router-dom';

const ALL_CATEGORIES = [
  { id: 'produce', name: 'Produce', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800', desc: 'Farm fresh fruits and vegetables.' },
  { id: 'dairy', name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800', desc: 'Milk, cheese, eggs, and butter.' },
  { id: 'meat', name: 'Meat & Seafood', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800', desc: 'Premium cuts and fresh seafood.' },
  { id: 'bakery', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800', desc: 'Freshly baked breads and pastries.' },
  { id: 'pantry', name: 'Pantry Staples', image: 'https://images.unsplash.com/photo-1588998829497-6a7e0edeb755?auto=format&fit=crop&q=80&w=800', desc: 'Pasta, grains, sauces, and spices.' },
  { id: 'snacks', name: 'Snacks & Candy', image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&q=80&w=800', desc: 'Chips, nuts, chocolate, and sweets.' },
  { id: 'beverages', name: 'Beverages', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800', desc: 'Juices, soda, coffee, and tea.' },
  { id: 'frozen', name: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1587311130635-f09c0d452d5b?auto=format&fit=crop&q=80&w=800', desc: 'Frozen meals, vegetables, and desserts.' },
];

export function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 animate-fade-in">
      <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">All Categories</h1>
        <p className="text-lg text-gray-500">
          Browse our complete selection of fresh, organic, and locally-sourced products carefully curated for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {ALL_CATEGORIES.map((cat) => (
          <Link 
            key={cat.id} 
            to={`/categories/${cat.id}`} 
            className="group relative flex flex-col h-72 md:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block border border-gray-100 bg-white"
          >
            {/* Image Container */}
            <div className="relative h-2/3 overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Text Overlay / Bottom Content */}
            <div className="h-1/3 p-6 flex flex-col justify-center bg-white relative z-10 transition-colors group-hover:bg-primary-50/50">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">{cat.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{cat.desc}</p>
                
                {/* Minimal Arrow indicator */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
