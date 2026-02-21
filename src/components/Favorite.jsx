import React from 'react';

const Favorite = () => {
  // Имитация избранных данных (и товары, и события)
  const favorites = [
    { id: 1, type: 'event', title: "Flohmarkt am Mauerpark", date: "22.02.2026", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400" },
    { id: 2, type: 'item', title: "iPhone 14 pro 128 Lila", price: "100 Euro", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400" },
    { id: 3, type: 'item', title: "Vintage Kamera", price: "45 Euro", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400" },
  ];

  return (
    <div className="pb-28">
      {/* HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1080px] mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#1E293B]">Favoriten</h1>
          <div className="text-[#52A7E0] text-xl">
            <i className="bi bi-heart-fill"></i>
          </div>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4 mt-6">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="bg-white rounded-[2rem] p-4 flex items-center gap-4 shadow-sm border border-slate-50 relative group">
                {/* Метка типа (товар или событие) */}
                <div className="absolute top-4 right-4 text-red-500">
                  <i className="bi bi-heart-fill"></i>
                </div>

                <img src={fav.image} className="w-20 h-20 rounded-[1.5rem] object-cover" alt="" />
                
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#52A7E0] uppercase tracking-wider">
                    {fav.type === 'event' ? 'Event' : 'Artikel'}
                  </span>
                  <h3 className="text-[#1E293B] font-bold text-lg leading-tight">{fav.title}</h3>
                  <p className="text-slate-900 font-black mt-1">
                    {fav.type === 'event' ? fav.date : fav.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <i className="bi bi-heart text-6xl text-slate-200"></i>
            <p className="text-slate-400 mt-4 font-medium">Noch keine Favoriten gespeichert</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;