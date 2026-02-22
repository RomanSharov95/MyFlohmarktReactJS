import React, { useState } from 'react';
// Убедись, что все эти файлы реально есть в папке components!
import Home from './components/Home';
import Inserate from './components/Inserate';
import Favorite from './components/Favorite';
import Account from './components/Account';
import Nachrichten from './components/Nachrichten';
import AddItem from './components/AddItem';
import FlohmarktView from './components/FlohmarktView';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdding, setIsAdding] = useState(null); // 'flohmarkt' или 'inserate'
  const [showSelection, setShowSelection] = useState(false);

  const renderPage = () => {
    // 1. Экран добавления
    if (isAdding) {
      return (
        <AddItem 
          type={isAdding} 
          onCancel={() => setIsAdding(null)} 
          onSave={(data) => {
            console.log("Данные формы:", data);
            setIsAdding(null);
          }} 
        />
      );
    }

    // 2. Экран просмотра деталей
    if (selectedEvent) {
      return (
        <FlohmarktView 
          event={selectedEvent} 
          onBack={() => setSelectedEvent(null)} 
        />
      );
    }

    // 3. Основные табы
    switch (currentPage) {
      case 'home': 
        return <Home onEventClick={setSelectedEvent} onChatClick={() => setCurrentPage('messages')} />;
      case 'inserate': 
        return <Inserate onChatClick={() => setCurrentPage('messages')} />;
      case 'favorite': 
        return <Favorite />;
      case 'account': 
        return <Account />;
      case 'messages': 
        return <Nachrichten />;
      default: 
        return <Home onEventClick={setSelectedEvent} onChatClick={() => setCurrentPage('messages')} />;
    }
  };

  return (
    <div className="App bg-[#F8FAFC] min-h-screen">
      <main>{renderPage()}</main>

      {/* Выбор типа публикации */}
      {showSelection && (
        <div 
          className="fixed inset-0 z-[5000] flex items-end justify-center px-4 pb-32 bg-black/40 backdrop-blur-sm transition-all" 
          onClick={() => setShowSelection(false)}
        >
          <div 
            className="bg-white w-full max-w-[400px] rounded-[2.5rem] p-6 shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-center font-black text-xl mb-6 text-[#1E293B]">Was möchtest du erstellen?</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setIsAdding('flohmarkt'); setShowSelection(false); }}
                className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-[2rem] hover:bg-[#52A7E0]/10 transition-colors"
              >
                <div className="w-14 h-14 bg-[#52A7E0] text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-[#52A7E0]/20">
                  <i className="bi bi-shop"></i>
                </div>
                <span className="font-bold text-sm text-[#1E293B]">Flohmarkt</span>
              </button>
              <button 
                onClick={() => { setIsAdding('inserate'); setShowSelection(false); }}
                className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-[2rem] hover:bg-[#3D5A80]/10 transition-colors"
              >
                <div className="w-14 h-14 bg-[#3D5A80] text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-[#3D5A80]/20">
                  <i className="bi bi-tag-fill"></i>
                </div>
                <span className="font-bold text-sm text-[#1E293B]">Inserat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Навигация видна только если мы не в режиме добавления/просмотра */}
      {!isAdding && !selectedEvent && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[2000]">
          <div className="max-w-[1080px] mx-auto px-6 py-4 flex justify-between items-center">
            
            <div onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'home' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'home' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-house-door-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Flohmärkte</span>
            </div>

            <div onClick={() => setCurrentPage('inserate')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'inserate' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'inserate' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-tag-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Inserate</span>
            </div>

            <div className="relative -top-3">
              <button 
                onClick={() => setShowSelection(true)} 
                className="bg-[#3D5A80] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white text-3xl active:scale-90 transition-all"
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>

            <div onClick={() => setCurrentPage('favorite')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'favorite' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'favorite' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-heart-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Favoriten</span>
            </div>

            <div onClick={() => setCurrentPage('account')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'account' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'account' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-person-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
            </div>

          </div>
        </nav>
      )}
    </div>
  );
}

export default App;