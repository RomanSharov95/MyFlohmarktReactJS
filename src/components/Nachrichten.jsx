import React, { useState, useEffect } from 'react';

const Nachrichten = ({ onChatStateChange }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Тестовые данные для списка чатов
  const chats = [
    { id: 1, name: "John Deo", lastMsg: "Ist der Preis verhandelbar?", time: "10:20", online: true },
    { id: 2, name: "Flohmarkt Mauerpark", lastMsg: "Deine Buchung wurde bestätigt", time: "Gestern", online: false },
  ];

  // Функция открытия чата
  const openChat = (chat) => {
    setSelectedChat(chat);
    if (onChatStateChange) onChatStateChange(true); // Скрываем навигацию в App.jsx
  };

  // Функция возврата к списку
  const closeChat = () => {
    setSelectedChat(null);
    if (onChatStateChange) onChatStateChange(false); // Показываем навигацию обратно
  };

  // Сбрасываем состояние при размонтировании компонента (на всякий случай)
  useEffect(() => {
    return () => {
      if (onChatStateChange) onChatStateChange(false);
    };
  }, [onChatStateChange]);

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
              onClick={() => openChat(chat)}
              className="bg-white p-4 rounded-[2rem] flex items-center gap-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-transparent hover:border-slate-100"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-xl overflow-hidden">
                  <i className="bi bi-person text-slate-400"></i>
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-[#1E293B]">{chat.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{chat.time}</span>
                </div>
                <p className="text-sm text-slate-500 truncate w-48 font-medium">{chat.lastMsg}</p>
              </div>
              <i className="bi bi-chevron-right text-slate-300"></i>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ЭКРАН 2: Открытый чат
  return (
    <div className="bg-white min-h-screen flex flex-col animate-in slide-in-from-right duration-300">
      {/* Шапка чата */}
      <header className="px-4 py-3 border-b flex items-center gap-3 sticky top-0 bg-white/95 backdrop-blur-md z-[7000]">
        <button onClick={closeChat} className="text-2xl text-[#52A7E0] p-1 active:scale-90 transition-transform">
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center relative">
          <i className="bi bi-person text-slate-400 text-lg"></i>
          {selectedChat.online && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h2 className="font-black text-[#1E293B] text-sm leading-none">{selectedChat.name}</h2>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</span>
        </div>
      </header>

      {/* Область сообщений */}
      <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-[#F8FAFC]">
        <div className="bg-[#52A7E0] text-white p-4 rounded-[1.5rem] rounded-tr-none ml-auto max-w-[85%] shadow-sm font-medium text-sm">
          Hallo! Ist der Artikel noch verfügbar?
        </div>
        <div className="bg-white text-[#1E293B] p-4 rounded-[1.5rem] rounded-tl-none mr-auto max-w-[85%] shadow-sm border border-slate-100 font-medium text-sm">
          {selectedChat.lastMsg}
        </div>
      </div>

      {/* СТРОКА ВВОДА (Она перекроет место, где раньше было меню) */}
      <div className="p-4 bg-white border-t sticky bottom-0 z-[8000]">
        <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-[1.5rem] px-4 py-1.5 border border-slate-50">
          <button className="text-slate-400 text-xl"><i className="bi bi-plus-lg"></i></button>
          <input 
            type="text" 
            placeholder="Nachricht schreiben..." 
            className="flex-grow bg-transparent border-none outline-none py-2 text-sm font-medium"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            disabled={!message.trim()}
            className={`transition-all p-2 rounded-full ${message.trim() ? 'text-[#52A7E0] scale-110 active:scale-95' : 'text-slate-300'}`}
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