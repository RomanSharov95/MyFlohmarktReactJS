import React from 'react';

// Добавляем onItemClick в пропсы
const Inserate = ({ onItemClick }) => {
  const categories = ["Alle", "Büro", "Garten", "Kleidung", "Technik", "Deko", "Pflanzen"];
  
  const items = [
    { id: 1, title: "iPhone 14 pro 128 Lila", price: "100", description: "Top Zustand, wie neu!", seller: "Roman", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400" },
    { id: 2, title: "T-Shirt Vintage", price: "10", description: "Größe M, Baumwolle.", seller: "Anna", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400" },
    { id: 3, title: "T-Shirt Blue", price: "10", description: "Neu mit Etikett.", seller: "Maxim", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400" },
    { id: 4, title: "MacBook Air M1", price: "750", description: "Akkukapazität 98%.", seller: "Stefan", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400" },
    { id: 5, title: "Zimmerpflanze Монстера", price: "25", description: "Große Blätter, inklusive Topf.", seller: "Julia", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400" },
    { id: 6, title: "Kaffeemaschine", price: "45", description: "Wenig genutzt, funktioniert einwandfrei.", seller: "Elena", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=400" },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-sans">
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

        {/* СЕТКА ТОВАРОВ */}
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              // КЛИК ТУТ: передаем данные в App.jsx
              onClick={() => onItemClick(item)} 
              className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-50 cursor-pointer active:scale-95 transition-transform duration-200"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-[#52A7E0] text-[10px] font-black uppercase tracking-wider truncate">{item.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                    <p className="text-[#1E293B] text-lg font-black">{item.price}</p>
                    <span className="text-[#1E293B] text-sm font-bold">€</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inserate;