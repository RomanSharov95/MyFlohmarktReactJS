import React from 'react';

const FlohmarktView = ({ event, onBack }) => {
  // Используем данные из пропса event, либо дефолтные для теста
  const data = event || {
    title: "Flohmarkt am Mauerpark",
    address: "Rosenplatz 33, 92224 Amberg",
    date: "01.01.2026",
    time: "von 10:00 bis 14:00 (4 Stunden)",
    type: "Privat",
    fee: "0€",
    limit: "unbegrenzt",
    topic: "General",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800",
    organizer: "John Deo"
  };

  return (
    <div className="bg-white min-h-screen pb-32 animate-in fade-in duration-300">
      {/* HEADER */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 px-4 py-4 border-b border-slate-50 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl text-slate-800 p-2">
          <i className="bi bi-arrow-left"></i>
        </button>
        <h1 className="text-lg font-black text-[#1E293B] truncate max-w-[200px]">{data.title}</h1>
        <div className="flex gap-4">
          <button className="text-[#52A7E0] text-2xl"><i className="bi bi-heart"></i></button>
          <button className="text-[#52A7E0] text-2xl"><i className="bi bi-share"></i></button>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4 mt-4">
        {/* ИЗОБРАЖЕНИЕ */}
        <div className="w-full h-64 rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white mb-8">
          <img src={data.image} className="w-full h-full object-cover" alt={data.title} />
        </div>

        {/* СПИСОК ХАРАКТЕРИСТИК */}
        <div className="space-y-4 px-2">
          <div className="flex items-start gap-4 font-bold text-slate-700">
            <i className="bi bi-geo-alt-fill text-[#52A7E0] text-xl w-6"></i>
            <span>{data.address}</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-700">
            <i className="bi bi-calendar3 text-[#52A7E0] text-xl w-6"></i>
            <span>{data.date}</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-700">
            <i className="bi bi-clock text-[#52A7E0] text-xl w-6"></i>
            <span>{data.time}</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-700">
            <i className="bi bi-house-door text-[#52A7E0] text-xl w-6"></i>
            <span>Art: {data.type}</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-700">
            <i className="bi bi-cash-stack text-[#52A7E0] text-xl w-6"></i>
            <span>Teilnahmegebühr in Euro {data.fee}</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-700">
            <i className="bi bi-people text-[#52A7E0] text-xl w-6"></i>
            <span>Teilnehmeranzahl: {data.limit}</span>
          </div>
          <div className="flex items-center gap-4 font-bold text-slate-700">
            <i className="bi bi-tag text-[#52A7E0] text-xl w-6"></i>
            <span>Theма: {data.topic}</span>
          </div>
        </div>

        {/* ОПИСАНИЕ */}
        <div className="mt-8 px-2">
          <p className="text-slate-600 leading-relaxed font-medium">
            {data.description}
          </p>
        </div>

        {/* ТЕГИ */}
        <div className="flex gap-2 mt-6 flex-wrap px-2">
          {["Parkplätze", "Barrierefrei", "Essen"].map(tag => (
            <span key={tag} className="bg-[#F1F5F9] text-slate-400 px-5 py-2 rounded-xl text-sm font-bold">
              {tag}
            </span>
          ))}
        </div>

        {/* КАРТОЧКА ОРГАНИЗАТОРА */}
        <div className="mt-10 p-5 bg-white rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm mb-10">
          <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center">
             <i className="bi bi-person text-3xl text-slate-400"></i>
          </div>
          <div>
            <h4 className="text-[#52A7E0] font-black">{data.organizer}</h4>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">Seit 2026</p>
          </div>
        </div>
      </div>

      {/* КНОПКИ ВНИЗУ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-50 z-[1001]">
        <div className="max-w-[1080px] mx-auto flex gap-4">
          <button className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-black text-[#1E293B] active:scale-95 transition-all text-sm">
            Organisator kontaktieren
          </button>
          <button className="flex-1 py-4 bg-[#52A7E0] text-white rounded-2xl font-black shadow-lg active:scale-95 transition-all text-sm">
            Teilnehmen
          </button>
        </div>
      </div>
    </div>
  );
};

// Самая важная строка, без которой будет белый экран:
export default FlohmarktView;