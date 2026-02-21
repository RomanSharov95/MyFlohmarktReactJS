import React from 'react';

const Home = () => {
  const events = [
    { 
      id: 1, 
      title: "Flohmarkt am Mauerpark", 
      date: "22.02.2026 Sonntag, 11:00", 
      location: "Berlin", 
      image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      title: "Nachtflohmarkt", 
      date: "21.02.2026 Samstag, 18:00", 
      location: "München", 
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      id: 3, 
      title: "Flohmarkt am Mauerpark", 
      date: "22.02.2026 Sonntag, 11:00", 
      location: "Berlin", 
      image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      id: 4, 
      title: "Nachtflohmarkt", 
      date: "21.02.2026 Samstag, 18:00", 
      location: "München", 
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=400&auto=format&fit=crop" 
    },
  ];

  return (
    /* Внешний контейнер на весь экран с фоном */
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-sans relative">
      
      {/* 1. HEADER: Фон на всю ширину, контент в центре */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1080px] mx-auto px-4 py-3 flex items-center gap-4">
          {/* Логотип */}
          <div className="w-10 h-10 flex-shrink-0">
             <img src="/icon.png" alt="MyFlohmarkt" className="w-full h-full object-contain" />
          </div>
          
          {/* Поиск */}
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Suche nach einem Flohmarkt" 
              className="w-full bg-[#F1F5F9] border-none rounded-full py-2.5 px-6 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-[#52A7E0]/30 transition-all outline-none"
            />
          </div>

          {/* Иконка сообщений */}
          <button className="text-[#52A7E0] hover:scale-110 transition-transform">
            <svg className="w-7 h-7 rotate-[-15deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* 2. MAP SECTION: Ограничена по центру */}
      <section className="max-w-[1080px] mx-auto px-4 mt-4">
        <div className="w-full h-52 bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm relative border-4 border-white group">
          <img 
            src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1200&auto=format&fit=crop" 
            alt="Frankfurt Map" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Маркер */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2.5 rounded-full shadow-xl border-2 border-[#52A7E0]">
            <div className="w-3 h-3 bg-[#52A7E0] rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 3. EVENTS GRID: Две колонки на больших экранах, одна на мобильных */}
      <section className="max-w-[1080px] mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="bg-white rounded-[2.5rem] p-5 flex items-center gap-5 shadow-[0_8px_20px_rgba(87,136,193,0.08)] border border-slate-50 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all cursor-pointer group"
          >
            {/* Изображение */}
            <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-[1.8rem]">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Текст */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-[#1E293B] font-bold text-xl leading-tight group-hover:text-[#52A7E0] transition-colors">
                {event.title}
              </h3>
              <p className="text-[#52A7E0] font-medium text-[15px] mt-1.5">
                {event.date}
              </p>
              <p className="text-slate-900 font-bold text-sm mt-1 uppercase tracking-wider">
                {event.location}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. TAB BAR: Фон на всю ширину, иконки в центре */}
{/* Обновленный Tab Bar с Bootstrap Icons */}
<nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-50">
  <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
    
    {/* Flohmärkte */}
    <div className="flex flex-col items-center gap-1 cursor-pointer group">
      <div className="bg-[#52A7E0] px-4 py-1.5 rounded-2xl text-white shadow-md">
         <i className="bi bi-house-door-fill text-xl"></i>
      </div>
      <span className="text-[10px] font-bold text-[#52A7E0] uppercase">Flohmärkte</span>
    </div>

    {/* Inserate */}
    <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-all">
      <i className="bi bi-tag text-2xl text-[#1E293B]"></i>
      <span className="text-[10px] font-bold text-[#1E293B] uppercase">Inserate</span>
    </div>

    {/* Кнопка + */}
    <div className="relative -top-3">
      <button className="bg-[#3D5A80] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
        <i className="bi bi-plus-lg text-3xl"></i>
      </button>
    </div>

    {/* Favoriten */}
    <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-all">
      <i className="bi bi-heart text-2xl text-[#1E293B]"></i>
      <span className="text-[10px] font-bold text-[#1E293B] uppercase">Favoriten</span>
    </div>

    {/* Account */}
    <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-all">
      <i className="bi bi-person text-2xl text-[#1E293B]"></i>
      <span className="text-[10px] font-bold text-[#1E293B] uppercase">Account</span>
    </div>

  </div>
</nav>
    </div>
  );
};

export default Home;