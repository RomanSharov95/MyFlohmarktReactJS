import React, { useState } from 'react';

const Account = () => {
  // Состояние переключателя: 'events' или 'items'
  const [subTab, setSubTab] = useState('events');

  return (
    <div className="pb-28">
      {/* 1. HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1080px] mx-auto px-4 py-4 flex items-center justify-between">
           <div className="w-10 h-10">
              <img src="/icon.png" alt="Logo" className="w-full h-full object-contain" />
           </div>
           <h1 className="text-xl font-black text-[#1E293B]">Mein Profil</h1>
           <button className="text-[#52A7E0] text-2xl">
              <i className="bi bi-door-open"></i>
           </button>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4 mt-6">
        {/* 2. PROFILE INFO */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50">
           <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl overflow-hidden border-4 border-[#F1F5F9]">
              <i className="bi bi-person text-slate-300"></i>
           </div>
           <div>
              <p className="text-[#52A7E0] text-xs font-bold uppercase tracking-widest">John Deo</p>
              <h2 className="text-[#1E293B] font-black text-xl">john.deo@gmail.com</h2>
              <p className="text-slate-500 font-bold">+491786074455</p>
              <button className="mt-2 text-[#52A7E0] font-bold text-sm border-b-2 border-[#52A7E0]/20 pb-0.5">
                Bearbeiten
              </button>
           </div>
        </div>

        {/* 3. TOGGLE SWITCH (Meine Flohmärkte / Meine Inserate) */}
        <div className="flex bg-white p-1.5 rounded-2xl mt-8 shadow-inner border border-slate-100">
           <button 
             onClick={() => setSubTab('events')}
             className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${subTab === 'events' ? 'bg-[#52A7E0] text-white shadow-md' : 'text-slate-400'}`}
           >
             Meine Flohmärkte
           </button>
           <button 
             onClick={() => setSubTab('items')}
             className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${subTab === 'items' ? 'bg-[#52A7E0] text-white shadow-md' : 'text-slate-400'}`}
           >
             Meine Inserate
           </button>
        </div>

        {/* 4. CONTENT LIST */}
        <div className="mt-6 space-y-4">
           {subTab === 'events' ? (
             // Список моих событий
             <div className="bg-white rounded-[2rem] p-4 flex items-center gap-4 shadow-sm border border-slate-50">
                <img src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=200" className="w-20 h-20 rounded-2xl object-cover" alt="" />
                <div>
                   <h3 className="font-bold text-[#1E293B]">Flohmarkt am Mauerpark</h3>
                   <p className="text-[#52A7E0] text-sm">22.02.2026 Sonntag, 11:00</p>
                   <p className="font-bold text-sm">Berlin</p>
                </div>
             </div>
           ) : (
             // Список моих товаров
             <div className="bg-white rounded-[2rem] p-4 flex items-center gap-4 shadow-sm border border-slate-50">
                <img src="https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=200" className="w-20 h-20 rounded-2xl object-cover" alt="" />
                <div>
                   <h3 className="font-bold text-[#1E293B]">iPhone 14 pro 128 Lila</h3>
                   <p className="text-slate-900 font-black">100 Euro</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Account;