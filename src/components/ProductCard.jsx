export default function ProductCard({ item }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-transform">
      <div className="w-20 h-20 bg-[#F3F4F0] rounded-[2rem] flex items-center justify-center text-2xl">
        📦
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.title}</h3>
        <p className="text-emerald-600 font-black text-xl tracking-tighter">{item.price} €</p>
      </div>
      <div className="pr-4">
        <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-300 text-xs">
          →
        </div>
      </div>
    </div>
  );
}