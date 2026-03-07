import React, { useState } from 'react';

// ─── Sample data (replace with API call later) ────────────────────────────────
const ITEMS = [
  { id: 1, title: 'iPhone 14 Pro 128GB Lila', price: '100', image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400' },
  { id: 2, title: 'T-Shirt', price: '10', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
  { id: 3, title: 'T-Shirt', price: '10', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
  { id: 4, title: 'iPhone 14 Pro 128GB Lila', price: '100', image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400' },
  { id: 5, title: 'iPhone 14 Pro 128GB Lila', price: '100', image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400' },
  { id: 6, title: 'T-Shirt', price: '10', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400' },
];

const CATEGORIES = ['Alle', 'Büro', 'Garten', 'Kleidung', 'Technik', 'Deko', 'Pflanzen'];

// ─── Inserate ─────────────────────────────────────────────────────────────────
export default function Inserate({ onItemClick, onChatClick }) {
  const [activeCategory, setActiveCategory] = useState('Alle');

  // Filter items by active category (shows all when 'Alle' is selected)
  const filteredItems = activeCategory === 'Alle'
    ? ITEMS
    : ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-sans">

      {/* ── Header ── */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-[1000]">
        <div className="max-w-[1080px] mx-auto px-4 py-3 flex items-center gap-4">
          <div className="w-10 h-10 flex-shrink-0">
            <img src="/icon.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Suche nach einem Artikel"
              className="w-full bg-[#F1F5F9] border-none rounded-full py-2.5 px-6 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30"
            />
          </div>
          <button
            onClick={onChatClick}
            className="text-[#52A7E0] hover:scale-110 active:scale-90 transition-transform"
          >
            <i className="bi bi-send-fill text-xl rotate-[-15deg]" />
          </button>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4">

        {/* ── Category filter (horizontal scroll) ── */}
        <div className="flex gap-3 overflow-x-auto py-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-[#52A7E0] text-white'
                  : 'bg-white text-[#1E293B] border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Item grid (2 columns) ── */}
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-50 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-[#52A7E0] text-xs font-bold truncate">{item.title}</p>
                <p className="text-[#1E293B] text-lg font-black mt-0.5">{item.price} €</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
