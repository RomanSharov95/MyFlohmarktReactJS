import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet's default marker icons not loading with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ─── Sample data (replace with API call later) ────────────────────────────────
const EVENTS = [
  {
    id: 1,
    title: 'Flohmarkt am Mauerpark',
    address: 'Rosenplatz 33, 92224 Amberg',
    date: '22.02.2026 Sonntag, 11:00',
    time: 'von 10:00 bis 14:00 (4 Stunden)',
    type: 'Privat',
    fee: '0€',
    limit: 'unbegrenzt',
    topic: 'General',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr...',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800',
    organizer: 'John Deo',
  },
  {
    id: 2,
    title: 'Nachtflohmarkt',
    address: 'Theresienwiese, München',
    date: '21.02.2026 Samstag, 18:00',
    time: 'von 18:00 bis 23:00',
    type: 'Gewerblich',
    fee: '5€',
    limit: '500',
    topic: 'Antiquitäten',
    description: 'Einzigartige Antiquitäten bei Nacht entdecken.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800',
    organizer: 'Max Mustermann',
  },
];

// Default map center: Frankfurt
const DEFAULT_POSITION = [50.1109, 8.6821];

// ─── Sub-component: updates map view when position changes ────────────────────
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home({ onChatClick, onEventClick }) {
  const [position, setPosition] = useState(DEFAULT_POSITION);

  // Request user's GPS location on mount
  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.warn('Geolocation error:', err.message)
    );
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-28 font-sans relative">

      {/* ── Header ── */}
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
            <i className="bi bi-search absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button
            onClick={onChatClick}
            className="text-[#52A7E0] hover:scale-110 active:scale-90 transition-transform flex items-center justify-center"
          >
            <i className="bi bi-send-fill text-xl rotate-[-15deg]" />
          </button>
        </div>
      </header>

      {/* ── Map ── */}
      <section className="max-w-[1080px] mx-auto px-4 mt-4">
        <div className="w-full h-64 bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm border-4 border-white z-10 relative">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={position} />
            <Marker position={position} />
          </MapContainer>
        </div>
      </section>

      {/* ── Event list ── */}
      <section className="max-w-[1080px] mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENTS.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => onEventClick(event)} />
        ))}
      </section>

    </div>
  );
}

// ─── EventCard ────────────────────────────────────────────────────────────────
function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[2.5rem] p-5 flex items-center gap-5 shadow-sm border border-slate-50 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
    >
      <img
        src={event.image}
        className="w-24 h-24 rounded-[1.8rem] object-cover flex-shrink-0"
        alt={event.title}
      />
      <div>
        <h3 className="text-[#1E293B] font-bold text-xl leading-tight mb-1">{event.title}</h3>
        <p className="text-[#52A7E0] font-medium text-sm flex items-center gap-2">
          <i className="bi bi-calendar3" />
          {event.date}
        </p>
        <p className="text-slate-900 font-bold text-[13px] mt-1 uppercase flex items-center gap-2">
          <i className="bi bi-geo-alt-fill text-[#1E293B]" />
          {event.address}
        </p>
      </div>
    </div>
  );
}
