import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ВАЖНО: Container должен быть СНАРУЖИ основной функции Auth
const Container = ({ children, onBackToHome }) => (
  <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-10">
    <div className="w-full max-w-[400px]">
      <button onClick={onBackToHome} className="text-[#52A7E0] font-bold mb-8 active:opacity-50">
        ← Zurück
      </button>
      <h1 className="text-3xl font-black text-slate-800 mb-8 text-center tracking-tight">My Flohmarkt</h1>
      {children}
    </div>
  </div>
);

const Auth = ({ onLoginSuccess, onBackToHome }) => {
  const [mode, setMode] = useState('welcome'); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    plz: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "users", res.user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          plz: formData.plz,
          city: formData.city,
          email: formData.email,
          createdAt: new Date()
        });
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      onLoginSuccess();
    } catch (err) {
      alert("Fehler: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'welcome') {
    return (
      <Container onBackToHome={onBackToHome}>
        <div className="mt-10 space-y-4">
          <button onClick={() => setMode('login')} className="w-full py-4 bg-[#52A7E0] text-white rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all">
            Einloggen
          </button>
          <button onClick={() => setMode('register')} className="w-full py-4 border-2 border-slate-100 text-slate-700 rounded-2xl font-bold active:scale-95 transition-all">
            Registrieren
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container onBackToHome={onBackToHome}>
      <form onSubmit={handleAuth} className="space-y-3">
        {mode === 'register' && (
          <>
            <input 
              name="firstName" 
              value={formData.firstName}
              placeholder="Vorname*" 
              onChange={handleChange} 
              className="w-full p-4 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#52A7E0] outline-none" 
              required 
            />
            <input 
              name="lastName" 
              value={formData.lastName}
              placeholder="Nachname*" 
              onChange={handleChange} 
              className="w-full p-4 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#52A7E0] outline-none" 
              required 
            />
            <div className="flex gap-2">
              <input name="plz" value={formData.plz} placeholder="PLZ" onChange={handleChange} className="w-1/3 p-4 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 outline-none" />
              <input name="city" value={formData.city} placeholder="Stadt" onChange={handleChange} className="w-2/3 p-4 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 outline-none" />
            </div>
          </>
        )}
        
        <input 
          name="email" 
          type="email" 
          value={formData.email}
          placeholder="E-Mail*" 
          onChange={handleChange} 
          className="w-full p-4 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#52A7E0] outline-none" 
          required 
        />
        
        <div className="relative">
          <input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            value={formData.password}
            placeholder="Passwort*" 
            onChange={handleChange} 
            className="w-full p-4 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#52A7E0] outline-none" 
            required 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <i className={`bi bi-eye${showPassword ? '' : '-slash'}`}></i>
          </button>
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-4 bg-[#52A7E0] text-white rounded-2xl font-bold mt-6 shadow-xl shadow-blue-100 active:scale-95 transition-all disabled:bg-slate-300"
        >
          {loading ? 'Laden...' : (mode === 'login' ? 'Anmelden' : 'Konto erstellen')}
        </button>
        
        <button 
          type="button" 
          onClick={() => setMode('welcome')} 
          className="w-full text-slate-400 text-sm font-bold pt-2"
        >
          Abbrechen
        </button>
      </form>
    </Container>
  );
};

export default Auth;