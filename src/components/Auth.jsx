import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function getErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'Diese E-Mail wird bereits verwendet.',
    'auth/invalid-email':        'Ungültige E-Mail-Adresse.',
    'auth/weak-password':        'Passwort muss mindestens 6 Zeichen lang sein.',
    'auth/user-not-found':       'Kein Konto mit dieser E-Mail gefunden.',
    'auth/wrong-password':       'Falsches Passwort.',
    'auth/invalid-credential':   'E-Mail oder Passwort ist falsch.',
    'auth/too-many-requests':    'Zu viele Versuche. Bitte warte kurz.',
  };
  return messages[code] || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
}

export default function Auth({ onLogin, onBackToHome }) {
  const [isLogin, setIsLogin]     = useState(true);
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  const handleSubmit = async () => {
    if (!email || !password) return;
    setError(null);
    setIsLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.uid), {
          email:     user.email,
          createdAt: serverTimestamp(),
          favorites: [],
        });
      }
      onLogin();
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <header className="w-full bg-white shadow-sm sticky top-0 z-[1000]">
        <div className="max-w-[1080px] mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={onBackToHome} className="text-[#52A7E0] p-2 -ml-2 active:scale-90 transition-transform">
            <i className="bi bi-arrow-left text-2xl" />
          </button>
          <h2 className="text-lg font-black tracking-tight">
            {isLogin ? 'Anmelden' : 'Registrieren'}
          </h2>
        </div>
      </header>

      <div className="max-w-[480px] mx-auto px-6 pt-12 space-y-5">
        <div className="flex bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${isLogin ? 'bg-[#52A7E0] text-white shadow-sm' : 'text-slate-500'}`}
          >
            Anmelden
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${!isLogin ? 'bg-[#52A7E0] text-white shadow-sm' : 'text-slate-500'}`}
          >
            Registrieren
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            <i className="bi bi-exclamation-circle mr-2" />
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">E-Mail</label>
          <input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Passwort</label>
          <input
            type="password"
            placeholder="Mindestens 6 Zeichen"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !email || !password}
          className="w-full py-4 bg-[#52A7E0] text-white font-black rounded-2xl shadow-lg shadow-[#52A7E0]/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Bitte warten...' : isLogin ? 'Anmelden' : 'Konto erstellen'}
        </button>
      </div>
    </div>
  );
}