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
    <div className="bg-white min-h-screen font-sans flex flex-col">

      {/* ── Logo section ── */}
      <div className="flex flex-col items-center justify-center pt-16 pb-8 px-6">
        <img src="/icon.png" alt="Logo" className="w-32 h-32 object-contain mb-4" />
        <h1 className="text-3xl font-black text-[#1E293B]">My Flohmarkt</h1>
      </div>

      <div className="max-w-[480px] w-full mx-auto px-6 space-y-4 flex-1">

        {/* ── Tab switcher ── */}
        <div className="flex bg-[#F1F5F9] rounded-2xl p-1">
          <button
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              isLogin ? 'bg-white text-[#1E293B] shadow-sm' : 'text-slate-400'
            }`}
          >
            Anmelden
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              !isLogin ? 'bg-white text-[#1E293B] shadow-sm' : 'text-slate-400'
            }`}
          >
            Registrieren
          </button>
        </div>

        {/* ── Error message ── */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            <i className="bi bi-exclamation-circle mr-2" />
            {error}
          </div>
        )}

        {/* ── Email input ── */}
        <input
          type="email"
          placeholder="E-Mail*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-200 rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
        />

        {/* ── Password input ── */}
        <input
          type="password"
          placeholder="Passwort*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-200 rounded-xl py-4 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
        />

        {/* ── Submit button ── */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !email || !password}
          className="w-full py-4 bg-[#52A7E0] text-white font-black rounded-2xl shadow-lg shadow-[#52A7E0]/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Bitte warten...' : isLogin ? 'Einloggen' : 'Konto erstellen'}
        </button>

        {/* ── Back button ── */}
        <button
          onClick={onBackToHome}
          className="w-full py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl active:scale-95 transition-all"
        >
          Zurück
        </button>

        {/* ── Legal note ── */}
        <p className="text-xs text-slate-400 text-center pb-8">
          Es gelten unsere Nutzungsbedingungen. Informationen zur Verarbeitung Deiner Daten findest du in unserer Datenschutzerklärung.
        </p>

      </div>
    </div>
  );
}