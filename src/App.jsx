import React, { useState } from 'react'; // Исправляет ошибку useState is not defined
import Home from './components/Home';
import Inserate from './components/Inserate';
import Favorite from './components/Favorite';
import Account from './components/Account';
import Nachrichten from './components/Nachrichten'; // Исправляет ошибку Nachrichten is not defined
import AddItem from './components/AddItem';
import FlohmarktView from './components/FlohmarktView';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdding, setIsAdding] = useState(null); 
  const [showSelection, setShowSelection] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Для скрытия меню в чате

  // Функция смены страницы (сбрасывает лишние состояния)
  const navigate = (page) => {
    setCurrentPage(page);
    setIsChatOpen(false);
    setSelectedEvent(null);
    setIsAdding(null);
  };

  const renderPage = () => {
    if (isAdding) return <AddItem type={isAdding} onCancel={() => setIsAdding(null)} onSave={() => setIsAdding(null)} />;
    if (selectedEvent) return <FlohmarktView event={selectedEvent} onBack={() => setSelectedEvent(null)} />;

    switch (currentPage) {
      case 'home': return <Home onEventClick={setSelectedEvent} onChatClick={() => navigate('messages')} />;
      case 'inserate': return <Inserate onChatClick={() => navigate('messages')} />;
      case 'favorite': return <Favorite />;
      case 'account': return <Account />;
      case 'messages': return <Nachrichten onChatStateChange={setIsChatOpen} />;
      default: return <Home onEventClick={setSelectedEvent} onChatClick={() => navigate('messages')} />;
    }
  };

  return (
    <div className="App bg-[#F8FAFC] min-h-screen">
      <main>{renderPage()}</main>

      {/* Навигация: исчезает, если открыт чат, форма добавления или просмотр деталей */}
      {!isAdding && !selectedEvent && !isChatOpen && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[2000]">
          <div className="max-w-[1080px] mx-auto px-6 py-4 flex justify-between items-center">
            
            <div onClick={() => navigate('home')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'home' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'home' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-house-door-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Flohmärkte</span>
            </div>

            <div onClick={() => navigate('inserate')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'inserate' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'inserate' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-tag-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Inserate</span>
            </div>

            <div className="relative -top-3">
              <button onClick={() => setShowSelection(true)} className="bg-[#3D5A80] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white text-3xl active:scale-90 transition-all">
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>

            <div onClick={() => navigate('favorite')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'favorite' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'favorite' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-heart-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Favoriten</span>
            </div>

            <div onClick={() => navigate('account')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'account' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'account' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-person-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Account</span>
            </div>

          </div>
        </nav>
      )}

      {/* Модалка выбора типа создания */}
      {showSelection && (
        <div className="fixed inset-0 z-[5000] flex items-end justify-center px-4 pb-32 bg-black/40 backdrop-blur-sm" onClick={() => setShowSelection(false)}>
          <div className="bg-white w-full max-w-[400px] rounded-[2.5rem] p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
             <h2 className="text-center font-black text-xl mb-6 text-[#1E293B]">Was möchtest du erstellen?</h2>
             <div className="grid grid-cols-2 gap-4">
               <button onClick={() => { setIsAdding('flohmarkt'); setShowSelection(false); }} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-[2rem] hover:bg-[#52A7E0]/10 transition-colors">
                 <div className="w-14 h-14 bg-[#52A7E0] text-white rounded-2xl flex items-center justify-center text-2xl"><i className="bi bi-shop"></i></div>
                 <span className="font-bold text-sm">Flohmarkt</span>
               </button>
               <button onClick={() => { setIsAdding('inserate'); setShowSelection(false); }} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-[2rem] hover:bg-[#3D5A80]/10 transition-colors">
                 <div className="w-14 h-14 bg-[#3D5A80] text-white rounded-2xl flex items-center justify-center text-2xl"><i className="bi bi-tag-fill"></i></div>
                 <span className="font-bold text-sm">Inserat</span>
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;