import React, { useState } from 'react';
import Home from './components/Home';
import Inserate from './components/Inserate';
import Favorite from './components/Favorite';
import Account from './components/Account';
import Nachrichten from './components/Nachrichten';
import AddItem from './components/AddItem';
import FlohmarktView from './components/FlohmarktView';
import Auth from './components/Auth'; // ВАЖНО: Добавьте этот импорт!

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdding, setIsAdding] = useState(null); 
  const [showSelection, setShowSelection] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setIsChatOpen(false);
    setSelectedEvent(null);
    setIsAdding(null);
  };

  const renderPage = () => {
    // Режимы добавления или просмотра деталей перекрывают всё (кроме входа)
    if (isAdding) return <AddItem type={isAdding} onCancel={() => setIsAdding(null)} onSave={() => setIsAdding(null)} />;
    if (selectedEvent) return <FlohmarktView event={selectedEvent} onBack={() => setSelectedEvent(null)} />;

    switch (currentPage) {
      case 'home': return <Home onEventClick={setSelectedEvent} onChatClick={() => navigate('messages')} />;
      case 'inserate': return <Inserate onChatClick={() => navigate('messages')} />;
      case 'favorite': return <Favorite />;
      case 'messages': return <Nachrichten onChatStateChange={setIsChatOpen} />;
      
      // ВОТ ТУТ МАГИЯ: экран входа появляется только для аккаунта
// Внутри renderPage, в блоке switch:
case 'account': 
  return isAuthenticated ? (
    <Account />
  ) : (
    <Auth 
      onLogin={() => setIsAuthenticated(true)} 
      onBackToHome={() => navigate('home')} // Теперь кнопка сверху вернет на главную
    />
  );
      default: return <Home onEventClick={setSelectedEvent} onChatClick={() => navigate('messages')} />;
    }
  };

  return (
    <div className="App bg-[#F8FAFC] min-h-screen">
      <main>{renderPage()}</main>

      {/* Навигация теперь видна ВСЕГДА, кроме режима чата или добавления */}
     {!isAdding && !selectedEvent && !isChatOpen && (currentPage !== 'account' || isAuthenticated) && (
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

            {/* При клике сюда откроется либо Auth, либо Account */}
            <div onClick={() => navigate('account')} className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === 'account' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
              <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'account' ? 'bg-[#52A7E0] text-white shadow-sm' : ''}`}><i className="bi bi-person-fill text-lg"></i></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Account</span>
            </div>

          </div>
        </nav>
      )}

      {/* ... модалка выбора создания остается без изменений ... */}
    </div>
  );
}

export default App;