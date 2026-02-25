import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState('welcome'); // 'welcome', 'login', 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Обертка для центрирования контента (как ты просил для Nachrichten)
  const AuthContainer = ({ children }) => (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12 max-w-[450px] mx-auto animate-in fade-in duration-500">
      <div className="w-full flex justify-end mb-8">
        <button className="text-sm font-bold text-slate-400 uppercase tracking-widest">Support</button>
      </div>
      
      {/* Логотип из твоего макета */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative mb-6">
          <i className="bi bi-hanger text-[120px] text-slate-300"></i>
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
             <div className="w-20 h-28 bg-[#52A7E0] rounded-lg relative">
                <div className="absolute -right-4 bottom-4 bg-[#C0392B] w-10 h-12 rounded flex items-center justify-center rotate-12 shadow-lg">
                   <span className="text-white font-black text-xl">F</span>
                </div>
             </div>
          </div>
        </div>
        <h1 className="text-3xl font-black text-[#1E293B]">My Flohmarkt</h1>
      </div>

      {children}

      <p className="mt-auto text-[10px] text-slate-400 text-center leading-relaxed">
        Es gelten unsere Nutzungsbedingungen. Informationen zur Verarbeitung Deiner Daten findest du in unserer Datenschutzerklärung.
      </p>
    </div>
  );

  // ЭКРАН: ВЫБОР (Welcome)
  if (mode === 'welcome') {
    return (
      <AuthContainer>
        <div className="w-full space-y-4 mb-12">
          <button 
            onClick={() => setMode('login')}
            className="w-full py-4 bg-[#52A7E0] text-white rounded-2xl font-bold shadow-lg shadow-[#52A7E0]/20 active:scale-[0.98] transition-all"
          >
            Einloggen
          </button>
          <button 
            onClick={() => setMode('register')}
            className="w-full py-4 bg-white border-2 border-slate-100 text-[#1E293B] rounded-2xl font-bold active:scale-[0.98] transition-all"
          >
            Registrieren
          </button>
        </div>
      </AuthContainer>
    );
  }

  // ЭКРАН: ВХОД (Login)
  if (mode === 'login') {
    return (
      <AuthContainer>
        <div className="w-full space-y-4 mb-8">
          <input type="email" placeholder="E-Mail*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#52A7E0] transition-colors" />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password*" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#52A7E0] transition-colors" 
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
            </button>
          </div>
          <button className="text-xs font-bold text-[#52A7E0] underline">Password vergessen?</button>
        </div>
        <div className="w-full space-y-3 mb-12">
          <button onClick={() => onLogin()} className="w-full py-4 bg-slate-200 text-slate-500 rounded-2xl font-bold cursor-not-allowed">Einloggen</button>
          <button onClick={() => setMode('welcome')} className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold">Zurück</button>
        </div>
      </AuthContainer>
    );
  }

  // ЭКРАН: РЕГИСТРАЦИЯ (Register)
  return (
    <AuthContainer>
      <div className="w-full space-y-3 mb-8 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        <input type="text" placeholder="Vorname*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
        <input type="text" placeholder="Nachname*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="PLZ*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
          <input type="text" placeholder="Stadt*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
        </div>
        <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-slate-400">
          <option>Nutzungsziel*</option>
          <option>Kaufen</option>
          <option>Verkaufen</option>
          <option>Beides</option>
        </select>
        <input type="email" placeholder="E-Mail*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
        <input type="password" placeholder="Password*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
        <input type="password" placeholder="Password wiederholen*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" />
      </div>
      <div className="w-full flex gap-3 mb-12">
        <button onClick={() => setMode('welcome')} className="flex-1 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold">Zurück</button>
        <button onClick={() => onLogin()} className="flex-[2] py-4 bg-[#52A7E0] text-white rounded-2xl font-bold shadow-lg shadow-[#52A7E0]/20">Registrieren</button>
      </div>
    </AuthContainer>
  );
};

export default Auth;