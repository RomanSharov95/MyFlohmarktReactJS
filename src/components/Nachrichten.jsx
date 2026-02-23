import React, { useState } from 'react';

const Nachrichten = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Состояние открытого чата
  const [message, setMessage] = useState('');

  // Тестовые данные для списка чатов
  const chats = [
    { id: 1, name: "John Deo", lastMsg: "Ist der Preis verhandelbar?", time: "10:20", online: true },
    { id: 2, name: "Flohmarkt Mauerpark", lastMsg: "Deine Buchung wurde подтверждена", time: "Gestern", online: false },
  ];

  // ЭКРАН 1: Список сообщений
  if (!selectedChat) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen pb-24 animate-in fade-in duration-300">
        <header className="bg-white p-6 shadow-sm sticky top-0 z-10">
          <h1 className="text-2xl font-black text-[#1E293B]">Nachrichten</h1>
        </header>

        <div className="p-4 space-y-3">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className="bg-white p-4 rounded-[2rem] flex items-center gap-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center text-xl">
                  <i className="bi bi-person text-slate-400"></i>
                </div>
                {chat.online && <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#1E293B]">{chat.name}</h3>
                  <span className="text-xs text-slate-400">{chat.time}</span>
                </div>
                <p className="text-sm text-slate-500 truncate w-48">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ЭКРАН 2: Открытый чат (Нижнее меню здесь скроется)
  return (
    <div className="bg-white min-h-screen flex flex-col animate-in slide-in-from-right duration-300">
      {/* Шапка чата */}
      <header className="p-4 border-b flex items-center gap-4 sticky top-0 bg-white z-50">
        <button onClick={() => setSelectedChat(null)} className="text-2xl text-[#52A7E0]">
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
          <i className="bi bi-person text-slate-400"></i>
        </div>
        <h2 className="font-bold text-[#1E293B]">{selectedChat.name}</h2>
      </header>

      {/* Область сообщений */}
      <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-[#F8FAFC]">
        <div className="bg-[#52A7E0] text-white p-4 rounded-[1.5rem] rounded-tr-none ml-auto max-w-[80%] shadow-sm">
          Hallo! Ist der Artikel noch verfügbar?
        </div>
        <div className="bg-white text-[#1E293B] p-4 rounded-[1.5rem] rounded-tl-none mr-auto max-w-[80%] shadow-sm border border-slate-100">
          {selectedChat.lastMsg}
        </div>
      </div>

      {/* СТРОКА ВВОДА (Вместо нижнего меню) */}
      <div className="p-4 bg-white border-t sticky bottom-0 z-[6000]">
        <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-2xl px-4 py-2">
          <input 
            type="text" 
            placeholder="Nachricht schreiben..." 
            className="flex-grow bg-transparent border-none outline-none py-2 text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            className={`transition-all ${message ? 'text-[#52A7E0] scale-110' : 'text-slate-300'}`}
            onClick={() => setMessage('')}
          >
            <i className="bi bi-send-fill text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nachrichten;