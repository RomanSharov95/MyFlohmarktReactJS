import React, { useState } from 'react';

const Nachrichten = () => {
  // Состояние: null — список чатов, {id} — открытый чат
  const [selectedChat, setSelectedChat] = useState(null);

  const chatList = [
    { id: 1, title: "iPhone 14 pro 128 Lila", user: "Käufer", lastMsg: "Lorem ipsum dolor sit amet, consetetur sadipscing...", time: "Heute 00:00", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=100" },
    { id: 2, title: "iPhone 14 pro 128 Lila", user: "Käufer", lastMsg: "Lorem ipsum dolor sit amet, consetetur sadipscing...", time: "Heute 00:00", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=100" },
    { id: 3, title: "iPhone 14 pro 128 Lila", user: "Käufer", lastMsg: "Lorem ipsum dolor sit amet, consetetur sadipscing...", time: "Heute 00:00", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=100" },
  ];

  // ЭКРАН 1: СПИСОК ЧАТОВ
  if (!selectedChat) {
    return (
      <div className="pb-28">
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-[1080px] mx-auto px-4 py-4 flex items-center justify-between">
            <div className="w-10 h-10"><img src="/icon.png" alt="Logo" className="w-full h-full object-contain" /></div>
            <h1 className="text-xl font-black text-[#1E293B]">Nachrichten</h1>
            <button className="text-[#1E293B] text-2xl"><i className="bi bi-send"></i></button>
          </div>
        </header>

        <div className="max-w-[1080px] mx-auto px-4 mt-4 space-y-3">
          {chatList.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat)}
              className="bg-white rounded-[1.5rem] p-3 flex items-center gap-4 shadow-sm border border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <img src={chat.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
              <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#52A7E0] text-sm truncate">{chat.title}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                </div>
                <p className="font-black text-[#1E293B] text-xs uppercase">{chat.user}</p>
                <p className="text-slate-500 text-[11px] truncate leading-tight mt-0.5">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ЭКРАН 2: ОТКРЫТЫЙ ЧАТ
  return (
    <div className="pb-28 bg-[#F8FAFC] min-h-screen">
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1080px] mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => setSelectedChat(null)} className="text-[#1E293B] text-xl">
            <i className="bi bi-arrow-left"></i>
          </button>
          <h1 className="text-xl font-black text-[#1E293B]">Nachrichten</h1>
          <button className="text-[#1E293B] text-2xl"><i className="bi bi-send"></i></button>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-4 mt-4">
        {/* Инфо о товаре в чате */}
        <div className="bg-white rounded-2xl p-2 flex items-center gap-3 shadow-sm border border-slate-50">
          <img src={selectedChat.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
          <div>
            <h3 className="font-bold text-[#52A7E0] text-xs">{selectedChat.title}</h3>
            <p className="font-black text-[#1E293B] text-[10px] uppercase">{selectedChat.user}</p>
          </div>
        </div>

        {/* Пузыри сообщений */}
        <div className="mt-8 space-y-6">
          <div className="flex justify-end"><div className="bg-white w-3/4 h-16 rounded-[1.5rem] shadow-sm border border-slate-100"></div></div>
          <div className="flex justify-start"><div className="bg-white w-3/4 h-24 rounded-[1.5rem] shadow-sm border border-slate-100"></div></div>
          <div className="flex justify-end"><div className="bg-white w-3/4 h-20 rounded-[1.5rem] shadow-sm border border-slate-100"></div></div>
          <div className="flex justify-start"><div className="bg-white w-3/4 h-16 rounded-[1.5rem] shadow-sm border border-slate-100"></div></div>
        </div>

        {/* Поле ввода */}
        <div className="fixed bottom-24 left-0 right-0 px-4">
          <div className="max-w-[1080px] mx-auto bg-white p-2 rounded-[2rem] shadow-lg flex items-center gap-2 border border-slate-100">
            <textarea 
              placeholder="Nachrichten schreiben" 
              className="flex-grow bg-transparent border-none resize-none px-4 py-2 text-sm focus:ring-0 outline-none h-12"
            />
            <button className="bg-[#52A7E0] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-all">
              Senden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nachrichten;