import React, { useState } from 'react';
import AddItem from './components/AddItem';
import ProductCard from './components/ProductCard';
import logo from './assets/logo.png'; // Укажи правильное расширение .png, .svg или .jpg

function App() {
  // 1. Состояние для страниц
  const [currentPage, setCurrentPage] = useState('home');
  // 2. Состояние для вкладок (События / Маркет)
  const [activeTab, setActiveTab] = useState('events'); 
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // Для отслеживания момента закрытия

  const closeBottomSheet = (callback) => {
  setIsExiting(true); // Запускаем анимацию ухода
  setTimeout(() => {
    setShowSelectionModal(false);
    setIsExiting(false);
    if (callback) callback(); // Если нужно перейти на другую страницу после закрытия
  }, 300); // Время совпадает с CSS (0.3s)
};
  
  // Временные данные
const [items, setItems] = useState([
  { id: 1, type: 'market', title: "Vintage Camera", price: 45 },
  { id: 2, type: 'market', title: "Old Skateboard", price: 20 },
  { id: 3, type: 'events', title: "Flohmarkt am Mauerpark", location: "Berlin", date: "Sonntag, 11:00" },
  { id: 4, type: 'events', title: "Nachtflohmarkt", location: "München", date: "Samstag, 18:00" }
]);

  const handleAddItem = (newItem) => {
    const itemWithId = { ...newItem, id: Date.now() };
    setItems([itemWithId, ...items]);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#F9FAF8] flex flex-col font-sans text-[#1A1A1A]">
    <header className="px-6 py-5 bg-white/70 backdrop-blur-lg sticky top-0 z-50 flex justify-between items-center">
      {/* Левая часть: Логотип */}
      <div 
        onClick={() => setCurrentPage('home')} 
        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img src={logo} alt="MFM Logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Правая часть: Мессенджер и Профиль */}
      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
          onClick={() => console.log('Открыть мессенджер')}
        >
          {/* Иконка конверта (SVG для четкости) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7 text-gray-800">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          
          {/* Индикатор нового сообщения (красная точка) */}
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      </div>
    </header><main className="flex-grow p-6 max-w-md mx-auto w-full pb-32">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-500">
            {/* Тот самый баннер */}
            <div className="bg-emerald-600 p-9 rounded-[3rem] text-white shadow-2xl mb-4 relative overflow-hidden text-left">
              <div className="relative z-10">
                <h2 className="text-4xl font-black leading-[0.9] italic tracking-tighter">
                  Finde<br />Schätze.
                </h2>
                <p className="mt-4 text-emerald-100 text-[10px] italic font-medium opacity-90 uppercase tracking-[0.2em]">
                  Event & Marktplatz
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500 rounded-full opacity-50"></div>
            </div>

            {/* Переключатель вкладок */}
            <div className="flex bg-gray-100 p-1.5 rounded-[2rem] mb-6">
              <button 
                onClick={() => setActiveTab('events')}
                className={`flex-1 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
              >
                📅 Events
              </button>
              <button 
                onClick={() => setActiveTab('market')}
                className={`flex-1 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'market' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
              >
                🛍️ Marktplatz
              </button>
            </div>

            {/* Контент в зависимости от вкладки */}
<div className="grid grid-cols-1 gap-4 text-left">
  {activeTab === 'events' ? (
    // Фильтруем и показываем только события
    items.filter(i => i.type === 'events').map(event => (
      <div key={event.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
        <div className="text-emerald-600 font-black text-[10px] uppercase mb-2">{event.date}</div>
        <h3 className="font-bold text-lg">{event.title}</h3>
        <p className="text-gray-400 text-sm">📍 {event.location}</p>
      </div>
    ))
  ) : (
    // Фильтруем и показываем только товары
    items.filter(i => i.type === 'market').map(item => (
      <ProductCard key={item.id} item={item} />
    ))
  )}
</div>
          </div>
        )}

        {currentPage === 'add' && (
          <AddItem 
            onCancel={() => setCurrentPage('home')} 
            onSave={handleAddItem} 
          />
        )}
      </main>

      {/* Нижнее меню */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-4 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 z-50">
        <button onClick={() => setCurrentPage('home')} className="text-2xl hover:scale-110">🏠</button>
<button 
  onClick={() => setShowSelectionModal(true)} // Теперь открываем модалку
  className="bg-emerald-600 text-white h-12 w-20 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-emerald-200 active:scale-90"
>
  <span className="text-3xl mb-1">+</span>
</button>
        <button className="text-2xl opacity-30">👤</button>
      </nav>
      {/* Плавное модальное окно выбора */}
{showSelectionModal && (
  <div className="fixed inset-0 z-[100] flex items-end justify-center px-6 pb-10">
    {/* Темная подложка */}
    <div 
      className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${isExiting ? 'overlay-exit' : 'overlay-enter'}`}
      onClick={() => closeBottomSheet()}
    ></div>

    {/* Само меню */}
    <div className={`relative w-full max-w-md bg-white rounded-[3rem] p-8 shadow-2xl ${isExiting ? 'modal-exit' : 'modal-enter'}`}>
      <h3 className="text-2xl font-black italic tracking-tighter mb-6 text-center">Was hast du vor?</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => closeBottomSheet(() => setCurrentPage('add'))}
          className="flex items-center gap-4 p-5 bg-emerald-50 rounded-[2rem] active:scale-95 transition-all text-left"
        >
          <div className="text-3xl">📅</div>
          <div>
            <div className="font-bold text-emerald-900 text-lg leading-tight">Flohmarkt organisieren</div>
            <div className="text-emerald-700/60 text-[10px] font-black uppercase tracking-widest mt-1">Event anmelden</div>
          </div>
        </button>

        <button 
          onClick={() => closeBottomSheet(() => setCurrentPage('add'))}
          className="flex items-center gap-4 p-5 bg-gray-50 rounded-[2rem] active:scale-95 transition-all text-left"
        >
          <div className="text-3xl">🛍️</div>
          <div>
            <div className="font-bold text-gray-900 text-lg leading-tight">Etwas verkaufen</div>
            <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Einzelstück inserieren</div>
          </div>
        </button>

        <button 
          onClick={() => closeBottomSheet()}
          className="mt-4 w-full py-2 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          Abbrechen
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;