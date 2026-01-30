export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          {event.date || 'Demnächst'}
        </div>
        <span className="text-2xl">📍</span>
      </div>
      <h3 className="text-xl font-black italic tracking-tighter text-gray-800 leading-tight">
        {event.title}
      </h3>
      <p className="text-gray-400 text-sm mt-1">{event.location}</p>
      
      <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-all">
        Details ansehen
      </button>
    </div>
  );
}