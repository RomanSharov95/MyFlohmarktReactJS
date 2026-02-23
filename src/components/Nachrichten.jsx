import React, { useState, useEffect } from 'react';

const Nachrichten = ({ onChatStateChange }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: "John Deo", lastMsg: "Ist der Preis verhandelbar?", time: "10:20", online: true },
    { id: 2, name: "Flohmarkt Mauerpark", lastMsg: "Deine Buchung wurde bestätigt", time: "Gestern", online: false },
  ];

  // Управление видимостью меню в App.jsx
  useEffect(() => {
    if (selectedChat) {
      onChatStateChange(true); // Скрыть меню
    } else {
      onChatStateChange(false); // Показать меню
    }
    return () => onChatStateChange(false);
  }, [selectedChat, onChatStateChange]);

  // ЭКРАН 1: Список сообщений (Теперь ограничен по ширине)
  if (!selectedChat) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-24 animate-in fade-in duration-300">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-[1080px] mx-auto px-6 py-6">
            <h1 className="text-2xl font-black text-[#1E293B]">Nachrichten</h1>
          </div>
        </header>

        {/* Контейнер-ограничитель, как в Home и Inserate */}
        <div className="max-w-[1080px] mx-auto px-4 py-6 space-y-3">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className="bg-white p-5 rounded-[2.5rem] flex items-center gap-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-transparent hover:border-slate-100"
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-xl overflow-hidden">
                  <i className="bi bi-person text-slate-400"></i>
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-[#1E293B] truncate">{chat.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 flex-shrink-0">{chat.time}</span>
                </div>
                <p className="text-sm text-slate-500 truncate font-medium">{chat.lastMsg}</p>
              </div>
              <i className="bi bi-chevron-right text-slate-300 ml-2"></i>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ЭКРАН 2: Чат (на весь экран мобильного, но с центровкой контента)
  return (
    <div className="bg-white min-h-screen flex flex-col fixed inset-0 z-[9000] animate-in slide-in-from-right duration-300">
      <header className="px-4 py-3 border-b flex items-center gap-3 bg-white/95 backdrop-blur-md sticky top-0">
        <div className="max-w-[1080px] mx-auto w-full flex items-center gap-3">
          <button onClick={() => setSelectedChat(null)} className="text-2xl text-[#52A7E0] p-1 active:scale-90 transition-transform">
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center relative">
            <i className="bi bi-person text-slate-400 text-lg"></i>
          </div>
          <div>
            <h2 className="font-black text-[#1E293B] text-sm leading-none">{selectedChat.name}</h2>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</span>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto bg-[#F8FAFC]">
        <div className="max-w-[1080px] mx-auto p-6 space-y-4">
          <div className="bg-[#52A7E0] text-white p-4 rounded-[1.5rem] rounded-tr-none ml-auto max-w-[85%] shadow-sm font-medium text-sm">
            Hallo! Ist der Artikel noch verfügbar?
          </div>
          <div className="bg-white text-[#1E293B] p-4 rounded-[1.5rem] rounded-tl-none mr-auto max-w-[85%] shadow-sm border border-slate-100 font-medium text-sm">
            {selectedChat.lastMsg}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t sticky bottom-0">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-[1.5rem] px-4 py-1.5 border border-slate-50">
            <input 
              type="text" 
              placeholder="Nachricht schreiben..." 
              className="flex-grow bg-transparent border-none outline-none py-2 text-sm font-medium"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`transition-all ${message.trim() ? 'text-[#52A7E0]' : 'text-slate-300'}`}>
              <i className="bi bi-send-fill text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nachrichten;