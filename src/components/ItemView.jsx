import React from 'react';

export default function ItemView({ item, onBack, onChatClick }) {
  if (!item) return null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 font-sans text-[#1E293B]">

      {/* ── Header ── */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-[1000]">
        <div className="max-w-[1080px] mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-[#52A7E0] p-2 -ml-2 active:scale-90 transition-transform"
          >
            <i className="bi bi-arrow-left text-2xl" />
          </button>
          <h2 className="text-lg font-black tracking-tight">{item.title}</h2>
          <div className="flex gap-3">
            <button className="text-[#52A7E0] active:scale-90 transition-transform">
              <i className="bi bi-heart text-2xl" />
            </button>
            <button className="text-[#52A7E0] active:scale-90 transition-transform">
              <i className="bi bi-share text-2xl" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4 mt-6">

        {/* ── Item image ── */}
        <div className="w-full h-[320px] rounded-[2.5rem] overflow-hidden shadow-sm border border-white">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Item details ── */}
        <div className="mt-8 px-4 space-y-5">
          <DetailRow icon="cash-stack"      value={`${item.price}€`} bold />
          <DetailRow icon="geo-alt"         value={item.location || '92224 Amberg'} />
          <DetailRow icon="calendar3"       value={item.date || '01.01.2026'} />
          <DetailRow icon="shop"            value={item.category || 'Kleidung'} />
          <DetailRow icon="hand-thumbs-up"  value={item.condition || 'Sehr gut'} />
        </div>

        {/* ── Description ── */}
        <div className="mt-8 px-4">
          <p className="text-slate-500 leading-relaxed text-sm font-medium italic">
            {item.description || 'Keine Beschreibung vorhanden.'}
          </p>
        </div>

        {/* ── Seller card ── */}
        <div className="mt-10 px-2 pb-10">
          <div className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
            <div className="w-14 h-14 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center text-slate-400">
              <i className="bi bi-person-fill text-2xl" />
            </div>
            <div>
              <h4 className="font-black text-[#52A7E0]">{item.sellerName || 'John Doe'}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Seit {item.sellerSince || '2026'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed "Nachrichten" button ── */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-[1100]">
        <div className="max-w-[1080px] mx-auto">
          <button
            onClick={() => onChatClick?.(item)}
            className="w-full bg-[#6393C7] text-white font-black py-4 rounded-[1.5rem] text-lg shadow-xl shadow-blue-100 active:scale-95 transition-all"
          >
            Nachrichten
          </button>
        </div>
      </div>

    </div>
  );
}

// ─── Helper component for a single detail row ─────────────────────────────────
function DetailRow({ icon, value, bold = false }) {
  return (
    <div className="flex items-center gap-5">
      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-[#52A7E0]">
        <i className={`bi bi-${icon} text-xl`} />
      </div>
      <span className={`text-md font-bold text-slate-600 ${bold ? 'text-xl font-black text-[#1E293B]' : ''}`}>
        {value}
      </span>
    </div>
  );
}
