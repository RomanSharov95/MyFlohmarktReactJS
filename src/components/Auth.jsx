import React, { useState } from 'react';

const Auth = ({ onLogin, onBackToHome }) => {
  const [mode, setMode] = useState('welcome'); // 'welcome', 'login', 'register'
  const [showPassword, setShowPassword] = useState(false);

  const AuthContainer = ({ children, title }) => (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center px-8 pt-6 pb-10 max-w-[450px] mx-auto animate-in fade-in duration-300">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ С КНОПКОЙ НАЗАД */}
      <div className="w-full flex justify-between items-center mb-10">
        <button 
          onClick={onBackToHome} 
          className="text-sm font-bold text-[#52A7E0] active:opacity-60 transition-opacity"
        >
          <i className="bi bi-chevron-left me-1"></i>
          Zurück
        </button>
        <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support</button>
      </div>
      
      {/* ЛОГОТИП */}
      <div className="flex flex-col items-center mb-12">
        <img 
          src="/icon.png" 
          alt="My Flohmarkt Logo" 
          className="w-40 h-auto mb-4"
          onError={(e) => e.target.style.display = 'none'} // Скроет пустой тег, если картинки нет
        />
        <h1 className="text-3xl font-black text-[#1E293B] tracking-tight">My Flohmarkt</h1>
      </div>

      <div className="w-full flex-grow flex flex-col justify-start">
        {children}
      </div>

      {/* ФУТЕР */}
      <div className="mt-8">
        <p className="text-[9px] text-slate-400 text-center leading-relaxed px-4">
          Es gelten unsere Nutzungsbedingungen. Informationen zur Verarbeitung Deiner Daten findest du in unserer Datenschutzerklärung.
        </p>
      </div>
    </div>
  );

  if (mode === 'welcome') {
    return (
      <AuthContainer>
        <div className="mt-16 space-y-4">
          <button onClick={() => setMode('login')} className="w-full py-4 bg-[#52A7E0] text-white rounded-2xl font-bold shadow-lg shadow-[#52A7E0]/20 active:scale-[0.98] transition-all">
            Einloggen
          </button>
          <button onClick={() => setMode('register')} className="w-full py-4 bg-white border border-slate-200 text-[#1E293B] rounded-2xl font-bold active:scale-[0.98] transition-all">
            Registrieren
          </button>
        </div>
      </AuthContainer>
    );
  }

  if (mode === 'login') {
    return (
      <AuthContainer>
        <div className="space-y-4">
          <input type="email" placeholder="E-Mail*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password*" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <i className={`bi bi-eye${showPassword ? '' : '-slash'}`}></i>
            </button>
          </div>
          <button className="text-[11px] font-bold text-[#52A7E0] underline ml-1">Password vergessen?</button>
          
          <div className="pt-8 space-y-3">
            <button onClick={onLogin} className="w-full py-4 bg-[#52A7E0] text-white rounded-2xl font-bold">Einloggen</button>
            <button onClick={() => setMode('welcome')} className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold">Abbrechen</button>
          </div>
        </div>
      </AuthContainer>
    );
  }

  // REGISTER
  return (
    <AuthContainer>
      <div className="space-y-3 overflow-y-auto max-h-[45vh] pr-2 mb-6 custom-scrollbar">
        <input type="text" placeholder="Vorname*" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
        <input type="text" placeholder="Nachname*" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="PLZ*" className="p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
          <input type="text" placeholder="Stadt*" className="p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
        </div>
        <input type="email" placeholder="E-Mail*" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
        <input type="password" placeholder="Password*" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
      </div>
      <div className="flex gap-3 mt-auto">
        <button onClick={() => setMode('welcome')} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm">Zurück</button>
        <button onClick={onLogin} className="flex-[2] py-4 bg-[#52A7E0] text-white rounded-2xl font-bold text-sm">Registrieren</button>
      </div>
    </AuthContainer>
  );
};

export default Auth;