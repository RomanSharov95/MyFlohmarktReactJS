import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged } from "firebase/auth";

// ИМПОРТЫ КОМПОНЕНТОВ
import Home from './components/Home';
import Inserate from './components/Inserate';
import Favorite from './components/Favorite';
import Account from './components/Account';
import Nachrichten from './components/Nachrichten';
import AddItem from './components/AddItem';
import FlohmarktView from './components/FlohmarktView';
import Auth from './components/Auth';

// СТИЛИ
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAdding, setIsAdding] = useState(null); 
  const [showSelection, setShowSelection] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Слушаем состояние авторизации
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    setIsChatOpen(false);
    setSelectedEvent(null);
    setIsAdding(null);
    setShowSelection(false);
  };

  const renderPage = () => {
    // 1. Если идет процесс добавления товара/маркета
    if (isAdding) {
      return <AddItem type={isAdding} onCancel={() => setIsAdding(null)} onSave={() => setIsAdding(null)} />;
    }
    
    // 2. Если открыт конкретный фломаркт
    if (selectedEvent) {
      return <FlohmarktView event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
    }

    // 3. Основная навигация
    switch (currentPage) {
      case 'home': 
        return <Home onEventClick={setSelectedEvent} onChatClick={() => navigate('messages')} />;
      case 'inserate': 
        return <Inserate onChatClick={() => navigate('messages')} />;
      case 'favorite': 
        return <Favorite />;
      case 'messages': 
        return <Nachrichten onChatStateChange={setIsChatOpen} />;
      case 'account': 
        return isAuthenticated ? (
          <Account user={user} />
        ) : (
          <Auth 
            onLogin={() => {
              setIsAuthenticated(true);
              navigate('home');
            }} 
            onBackToHome={() => navigate('home')} 
          />
        );
      default: 
        return <Home onEventClick={setSelectedEvent} onChatClick={() => navigate('messages')} />;
    }
  };

  return (
    <div className="App bg-[#F8FAFC] min-h-screen">
      <main className="pb-24"> {/* Добавили отступ снизу, чтобы меню не перекрывало контент */}
        {renderPage()}
      </main>

      {/* Навигация видна только если не открыт чат, добавление или просмотр деталей */}
     {!isAdding && !selectedEvent && !isChatOpen && (currentPage !== 'account' || isAuthenticated) && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[2000] pb-safe">
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

      {/* Модалка выбора (AddItem) */}
      {showSelection && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[3000] flex items-end justify-center p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 space-y-3 animate-in slide-in-from-bottom duration-300">
            <h3 className="text-xl font-black text-slate-800 mb-4 text-center">Was möchtest du erstellen?</h3>
            <button 
              onClick={() => { setIsAdding('market'); setShowSelection(false); }}
              className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center px-6 gap-4 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl"><i className="bi bi-shop"></i></div>
              <div className="text-left"><p className="font-bold text-slate-800">Flohmarkt</p><p className="text-xs text-slate-500">In deinem Garten/Garage</p></div>
            </button>
            <button 
              onClick={() => { setIsAdding('item'); setShowSelection(false); }}
              className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center px-6 gap-4 transition-colors"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-xl"><i className="bi bi-box-seam"></i></div>
              <div className="text-left"><p className="font-bold text-slate-800">Einzelnes Inserat</p><p className="text-xs text-slate-500">T-Shirt, Spielzeug, Möbel...</p></div>
            </button>
            <button onClick={() => setShowSelection(false)} className="w-full py-4 text-slate-400 font-bold text-sm uppercase tracking-widest pt-4">Abbrechen</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;