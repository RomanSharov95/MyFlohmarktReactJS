import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

// ─── FlohmarktView ────────────────────────────────────────────────────────────
export default function FlohmarktView({ event, onBack }) {
  const [showBooking, setShowBooking] = useState(false);
  const [isBooked, setIsBooked]       = useState(false);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState(null);
  const [form, setForm]               = useState({ name: '', phone: '', spots: '1' });

  const data = event || {
    title:       'Flohmarkt am Mauerpark',
    address:     'Rosenplatz 33, 92224 Amberg',
    date:        '01.01.2026',
    time:        'von 10:00 bis 14:00 (4 Stunden)',
    type:        'Privat',
    fee:         '0€',
    limit:       'unbegrenzt',
    topic:       'General',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
    image:       'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800',
    organizer:   'John Deo',
  };

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Save booking to Firestore under 'bookings' collection
  const handleBook = async () => {
    if (!form.name || !form.phone) {
      setError('Bitte fülle alle Pflichtfelder aus.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        eventTitle:  data.title,
        eventDate:   data.date,
        eventId:     event?.id || null,
        userId:      auth.currentUser?.uid || null,
        name:        form.name,
        phone:       form.phone,
        spots:       Number(form.spots),
        bookedAt:    serverTimestamp(),
      });
      setIsBooked(true);
      setShowBooking(false);
    } catch (err) {
      setError('Fehler beim Speichern. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32 animate-in fade-in duration-300">

      {/* ── Header ── */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 px-4 py-4 border-b border-slate-50 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl text-slate-800 p-2">
          <i className="bi bi-arrow-left" />
        </button>
        <h1 className="text-lg font-black text-[#1E293B] truncate max-w-[200px]">{data.title}</h1>
        <div className="flex gap-4">
          <button className="text-[#52A7E0] text-2xl"><i className="bi bi-heart" /></button>
          <button className="text-[#52A7E0] text-2xl"><i className="bi bi-share" /></button>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4 mt-4">

        {/* ── Event image ── */}
        <div className="w-full h-64 rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white mb-8">
          <img src={data.image} className="w-full h-full object-cover" alt={data.title} />
        </div>

        {/* ── Event details ── */}
        <div className="space-y-4 px-2">
          <DetailRow icon="geo-alt-fill"  value={data.address} />
          <DetailRow icon="calendar3"     value={data.date} />
          <DetailRow icon="clock"         value={data.time} />
          <DetailRow icon="house-door"    value={`Art: ${data.type}`} />
          <DetailRow icon="cash-stack"    value={`Teilnahmegebühr: ${data.fee}`} />
          <DetailRow icon="people"        value={`Teilnehmeranzahl: ${data.limit}`} />
          <DetailRow icon="tag"           value={`Thema: ${data.topic}`} />
        </div>

        {/* ── Description ── */}
        <div className="mt-8 px-2">
          <p className="text-slate-600 leading-relaxed font-medium">{data.description}</p>
        </div>

        {/* ── Feature tags ── */}
        <div className="flex gap-2 mt-6 flex-wrap px-2">
          {['Parkplätze', 'Barrierefrei', 'Essen'].map((tag) => (
            <span key={tag} className="bg-[#F1F5F9] text-slate-400 px-5 py-2 rounded-xl text-sm font-bold">{tag}</span>
          ))}
        </div>

        {/* ── Organizer card ── */}
        <div className="mt-10 p-5 bg-white rounded-[2rem] border border-slate-100 flex items-center gap-5 shadow-sm mb-10">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
            <i className="bi bi-person text-3xl text-slate-400" />
          </div>
          <div>
            <h4 className="text-[#52A7E0] font-black">{data.organizer}</h4>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">Seit 2026</p>
          </div>
        </div>
      </div>

      {/* ── Bottom action buttons ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-50 z-[1001]">
        <div className="max-w-[1080px] mx-auto flex gap-4">
          <button className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-black text-[#1E293B] active:scale-95 transition-all text-sm">
            Organisator kontaktieren
          </button>
          {isBooked ? (
            // Show confirmation after successful booking
            <div className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2">
              <i className="bi bi-check-circle-fill" />
              Gebucht!
            </div>
          ) : (
            <button
              onClick={() => setShowBooking(true)}
              className="flex-1 py-4 bg-[#52A7E0] text-white rounded-2xl font-black shadow-lg active:scale-95 transition-all text-sm"
            >
              Teilnehmen
            </button>
          )}
        </div>
      </div>

      {/* ── Booking modal ── */}
      {showBooking && (
        <div
          className="fixed inset-0 z-[3000] flex items-end justify-center px-4 pb-8 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setShowBooking(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#1E293B]">Platz reservieren</h3>
              <button onClick={() => setShowBooking(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            {/* Event info summary */}
            <div className="bg-[#F1F5F9] rounded-2xl px-4 py-3">
              <p className="font-black text-[#1E293B] text-sm">{data.title}</p>
              <p className="text-[#52A7E0] text-xs font-bold mt-0.5">{data.date} · {data.fee}</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                <i className="bi bi-exclamation-circle mr-2" />
                {error}
              </div>
            )}

            {/* Name input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Name*</label>
              <input
                type="text"
                placeholder="Vor- und Nachname"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
              />
            </div>

            {/* Phone input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Telefon*</label>
              <input
                type="tel"
                placeholder="+49 000 0000000"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
              />
            </div>

            {/* Number of spots */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Anzahl der Plätze*</label>
              <select
                value={form.spots}
                onChange={(e) => handleChange('spots', e.target.value)}
                className="w-full border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none"
              >
                {[1,2,3,4,5].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Platz' : 'Plätze'}</option>
                ))}
              </select>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleBook}
              disabled={isLoading}
              className="w-full py-4 bg-[#52A7E0] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Wird gespeichert...' : 'Jetzt buchen'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helper: single detail row ────────────────────────────────────────────────
function DetailRow({ icon, value }) {
  return (
    <div className="flex items-start gap-4 font-bold text-slate-700">
      <i className={`bi bi-${icon} text-[#52A7E0] text-xl w-6`} />
      <span>{value}</span>
    </div>
  );
}