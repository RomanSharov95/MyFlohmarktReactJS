import React, { useState } from 'react';
import Home from './components/Home';
import Inserate from './components/Inserate';
import Favorite from './components/Favorite';
import Account from './components/Account'; // Новый импорт
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';
import Nachrichten from './components/Nachrichten';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

const renderPage = () => {
  switch (currentPage) {
    case 'home': return <Home onChatClick={() => setCurrentPage('messages')} />;
    case 'inserate': return <Inserate onChatClick={() => setCurrentPage('messages')} />;
    case 'favorite': return <Favorite />;
    case 'account': return <Account />;
    case 'messages': return <Nachrichten />; // Наша новая страница
    default: return <Home />;
  }
};

  return (
    <div className="App bg-[#F8FAFC] min-h-screen">
      <main>{renderPage()}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[2000]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          
          {/* Flohmärkte */}
          <div onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentPage === 'home' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
            <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'home' ? 'bg-[#52A7E0] text-white' : ''}`}><i className="bi bi-house-door-fill text-lg"></i></div>
            <span className="text-[10px] font-bold uppercase">Flohmärkte</span>
          </div>

          {/* Inserate */}
          <div onClick={() => setCurrentPage('inserate')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentPage === 'inserate' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
            <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'inserate' ? 'bg-[#52A7E0] text-white' : ''}`}><i className="bi bi-tag-fill text-lg"></i></div>
            <span className="text-[10px] font-bold uppercase">Inserate</span>
          </div>

          {/* Plus Button */}
          <div className="relative -top-3">
            <button className="bg-[#3D5A80] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white text-3xl"><i className="bi bi-plus-lg"></i></button>
          </div>

          {/* Favorite */}
          <div onClick={() => setCurrentPage('favorite')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentPage === 'favorite' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
            <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'favorite' ? 'bg-[#52A7E0] text-white' : ''}`}><i className="bi bi-heart-fill text-lg"></i></div>
            <span className="text-[10px] font-bold uppercase">Favoriten</span>
          </div>

          {/* Account - ТЕПЕРЬ АКТИВЕН */}
          <div onClick={() => setCurrentPage('account')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentPage === 'account' ? 'text-[#52A7E0]' : 'opacity-40'}`}>
            <div className={`px-4 py-1.5 rounded-2xl ${currentPage === 'account' ? 'bg-[#52A7E0] text-white' : ''}`}><i className="bi bi-person-fill text-lg"></i></div>
            <span className="text-[10px] font-bold uppercase">Account</span>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default App;