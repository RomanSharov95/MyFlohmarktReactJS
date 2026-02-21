import React, { useState, useEffect } from 'react';
// Импорты для карты
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Исправление иконок Leaflet (чтобы маркер отображался)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
  // --- ЛОГИКА КОМПОНЕНТА (Мозг) ---
  
  // 1. Состояние для координат (по умолчанию Франкфурт)
  const [position, setPosition] = useState([50.1109, 8.6821]); 

  // 2. Функция для "полета" карты к новому месту
  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, 13);
    return null;
  }

  // 3. Получение реальной геопозиции при загрузке
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.log("Доступ к GPS отклонен пользователем");
        }
      );
    }
  }, []);

  // 4. Твои данные
  const events = [
    { id: 1, title: "Flohmarkt am Mauerpark", date: "22.02.2026 Sonntag, 11:00", location: "Berlin", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400" },
    { id: 2, title: "Nachtflohmarkt", date: "21.02.2026 Samstag, 18:00", location: "München", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=400" },
    { id: 3, title: "Flohmarkt am Mauerpark", date: "22.02.2026 Sonntag, 11:00", location: "Berlin", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400" },
    { id: 4, title: "Antikmarkt", date: "23.02.2026 Montag, 09:00", location: "Amberg", image: "https://images.unsplash.com/photo-1531050171669-a201228e52b6?q=80&w=400" },
  ];

  // --- ВИЗУАЛ (Тело) ---
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-sans relative">
      
      {/* HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-[1000]">
        <div className="max-w-[1080px] mx-auto px-4 py-3 flex items-center gap-4">
          <div className="w-10 h-10 flex-shrink-0">
             <img src="/icon.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Suche nach einem Flohmarkt" 
              className="w-full bg-[#F1F5F9] border-none rounded-full py-2.5 px-6 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30"
            />
            <i className="bi bi-search absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          </div>
          <button className="text-[#52A7E0]">
            <i className="bi bi-send-fill text-xl rotate-[-15deg]"></i>
          </button>
        </div>
      </header>

      {/* LIVE MAP SECTION */}
      <section className="max-w-[1080px] mx-auto px-4 mt-4">
        <div className="w-full h-64 bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm relative border-4 border-white z-10">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            <ChangeView center={position} />
            <Marker position={position} />
          </MapContainer>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="max-w-[1080px] mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-[2.5rem] p-5 flex items-center gap-5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <img src={event.image} className="w-24 h-24 rounded-[1.8rem] object-cover" alt="" />
            <div>
              <h3 className="text-[#1E293B] font-bold text-xl group-hover:text-[#52A7E0]">{event.title}</h3>
              <p className="text-[#52A7E0] font-medium text-sm"><i className="bi bi-calendar3 me-2"></i>{event.date}</p>
              <p className="text-slate-900 font-bold text-sm mt-1 uppercase"><i className="bi bi-geo-alt-fill me-1"></i>{event.location}</p>
            </div>
          </div>
        ))}
      </section>

      {/* TAB BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[1000]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 text-[#52A7E0]">
            <div className="bg-[#52A7E0] px-4 py-1.5 rounded-2xl text-white"><i className="bi bi-house-door-fill text-lg"></i></div>
            <span className="text-[10px] font-bold uppercase">Flohmärkte</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <i className="bi bi-tag text-2xl"></i>
            <span className="text-[10px] font-bold uppercase">Inserate</span>
          </div>
          <div className="relative -top-3">
            <button className="bg-[#3D5A80] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white text-3xl">
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <i className="bi bi-heart text-2xl"></i>
            <span className="text-[10px] font-bold uppercase">Favoriten</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <i className="bi bi-person text-2xl"></i>
            <span className="text-[10px] font-bold uppercase">Account</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;