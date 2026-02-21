import React from 'react';

const Inserate = () => {
  const categories = ["Alle", "Büro", "Garten", "Kleidung", "Technik", "Deko", "Pflanzen"];
  
  const items = [
    { id: 1, title: "iPhone 14 pro 128 Lila", price: "100 Euro", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400" },
    { id: 2, title: "T-Shirt", price: "10 Euro", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400" },
    { id: 3, title: "T-Shirt", price: "10 Euro", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400" },
    { id: 4, title: "iPhone 14 pro 128 Lila", price: "100 Euro", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400" },
    { id: 5, title: "iPhone 14 pro 128 Lila", price: "100 Euro", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400" },
    { id: 6, title: "T-Shirt", price: "10 Euro", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400" },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-sans">
      {/* 1. HEADER (Поиск по артикулам) */}
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
          <button className="text-[#52A7E0]">
            <i className="bi bi-send-fill text-xl rotate-[-15deg]"></i>
          </button>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4">
        {/* 2. КАТЕГОРИИ (Горизонтальный скролл) */}
        <div className="flex gap-3 overflow-x-auto py-6 no-scrollbar">
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`px-8 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all shadow-sm ${
                cat === "Alle" ? "bg-[#52A7E0] text-white" : "bg-white text-[#1E293B] border border-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. СЕТКА ТОВАРОВ (2 колонки как на макете) */}
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-50">
              <div className="aspect-square w-full overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-[#52A7E0] text-xs font-bold truncate">{item.title}</p>
                <p className="text-[#1E293B] text-lg font-black mt-0.5">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inserate;