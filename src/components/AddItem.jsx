import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

// ─── Initial form state ───────────────────────────────────────────────────────
const INITIAL_FORM = {
  title: '', street: '', houseNumber: '', plz: '', city: '',
  date: '', timeFrom: '', timeTo: '', orgType: '', fee: '',
  participants: '', topic: '', description: '',
  category: '', condition: '', price: '', features: [],
};

// ─── AddItem ──────────────────────────────────────────────────────────────────
export default function AddItem({ type, onCancel, onSave }) {
  const isFlohmarkt = type === 'event';

  const [formData, setFormData]   = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  const handleChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const toggleFeature = (feature) =>
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));

  // Validate required fields and save to Firestore
  const handleSave = async () => {
    setError(null);

    // Validation
    if (!formData.title) {
      setError('Bitte gib einen Namen ein.');
      return;
    }
    if (isFlohmarkt && (!formData.plz || !formData.city || !formData.date)) {
      setError('Bitte fülle alle Pflichtfelder aus.');
      return;
    }
    if (!isFlohmarkt && (!formData.category || !formData.condition)) {
      setError('Bitte wähle Kategorie und Zustand aus.');
      return;
    }

    setIsLoading(true);
    try {
      const collectionName = isFlohmarkt ? 'events' : 'items';
      await addDoc(collection(db, collectionName), {
        ...formData,
        userId:    auth.currentUser?.uid || null,
        createdAt: serverTimestamp(),
      });
      onSave(formData); // notify parent (closes the form)
    } catch (err) {
      setError('Fehler beim Speichern. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32">

      {/* ── Header ── */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-[3000] px-4 py-4 flex items-center justify-center">
        <h1 className="text-xl font-black text-[#1E293B]">
          {isFlohmarkt ? 'Flohmarkt planen' : 'Inserat aufgeben'}
        </h1>
      </header>

      <div className="max-w-[600px] mx-auto px-4 mt-6 space-y-6">

        {/* ── Photo upload placeholder ── */}
        <div className="w-full h-32 border-2 border-dashed border-[#52A7E0] rounded-[1.5rem] flex flex-col items-center justify-center bg-white text-[#52A7E0] cursor-pointer active:scale-[0.98] transition-transform">
          <i className="bi bi-camera text-2xl mb-1" />
          <span className="font-bold text-sm">Fotos hinzufügen</span>
        </div>

        {/* ── Error message ── */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            <i className="bi bi-exclamation-circle mr-2" />
            {error}
          </div>
        )}

        {/* ── Form: Flohmarkt ── */}
        {isFlohmarkt ? (
          <div className="space-y-4">
            <InputField name="title" placeholder="Name des Flohmarkts*" onChange={handleChange} />

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Adresse*</label>
              <div className="flex gap-2">
                <InputField name="street" placeholder="Strasse" onChange={handleChange} />
                <InputField name="houseNumber" placeholder="Nummer" fullWidth={false} onChange={handleChange} />
              </div>
              <div className="flex gap-2">
                <InputField name="plz" placeholder="PLZ*" onChange={handleChange} />
                <InputField name="city" placeholder="Stadt*" onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Datum und Uhrzeit*</label>
              <div className="flex items-center gap-2">
                <input type="date" className="flex-1 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" onChange={(e) => handleChange('date', e.target.value)} />
                <span className="text-sm">von</span>
                <input type="time" className="w-24 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" onChange={(e) => handleChange('timeFrom', e.target.value)} />
                <span className="text-sm">bis</span>
                <input type="time" className="w-24 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" onChange={(e) => handleChange('timeTo', e.target.value)} />
              </div>
            </div>

            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none appearance-none" onChange={(e) => handleChange('orgType', e.target.value)}>
              <option value="">Organisationsart*</option>
              <option value="Privat">Privat</option>
              <option value="Gewerblich">Gewerblich</option>
            </select>

            <div className="flex gap-2">
              <InputField name="fee" placeholder="Gebühr in Euro*" onChange={handleChange} />
              <InputField name="participants" placeholder="Teilnehmeranzahl*" onChange={handleChange} />
            </div>

            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" onChange={(e) => handleChange('topic', e.target.value)}>
              <option value="">Thema des Flohmarkts</option>
              <option value="General">General</option>
              <option value="Antiquitäten">Antiquitäten</option>
              <option value="Kleidung">Kleidung</option>
            </select>

            <textarea placeholder="Beschreibung" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none h-24 resize-none" onChange={(e) => handleChange('description', e.target.value)} />

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Features</label>
              <div className="flex gap-2">
                {['Parkplätze', 'Barrierefrei', 'Essen'].map((feature) => (
                  <button key={feature} onClick={() => toggleFeature(feature)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.features.includes(feature) ? 'bg-[#52A7E0] text-white border-[#52A7E0]' : 'bg-[#D1E1F0] text-[#52A7E0] border-transparent'
                    }`}>
                    + {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Form: Inserat ── */
          <div className="space-y-4">
            <InputField name="title" placeholder="Titel*" onChange={handleChange} />

            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" onChange={(e) => handleChange('category', e.target.value)}>
              <option value="">Kategorie*</option>
              <option value="Kleidung">Kleidung</option>
              <option value="Technik">Technik</option>
              <option value="Büro">Büro</option>
              <option value="Garten">Garten</option>
              <option value="Deko">Deko</option>
              <option value="Pflanzen">Pflanzen</option>
            </select>

            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" onChange={(e) => handleChange('condition', e.target.value)}>
              <option value="">Zustand*</option>
              <option value="Neu">Neu</option>
              <option value="Sehr gut">Sehr gut</option>
              <option value="Gut">Gut</option>
              <option value="Akzeptabel">Akzeptabel</option>
            </select>

            <InputField name="price" placeholder="Preis in €" type="number" onChange={handleChange} />

            <textarea placeholder="Beschreibung" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none h-32 resize-none" onChange={(e) => handleChange('description', e.target.value)} />

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Adresse*</label>
              <div className="flex gap-2">
                <InputField name="plz" placeholder="PLZ*" onChange={handleChange} />
                <InputField name="city" placeholder="Stadt*" onChange={handleChange} />
              </div>
              <div className="flex gap-2">
                <InputField name="street" placeholder="Strasse" onChange={handleChange} />
                <InputField name="houseNumber" placeholder="Nummer" fullWidth={false} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="flex gap-4 pt-4">
          <button onClick={onCancel} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-white active:scale-95 transition-all">
            Abbrechen
          </button>
          <button onClick={handleSave} disabled={isLoading}
            className="flex-1 py-3 bg-[#52A7E0] text-white rounded-xl font-bold shadow-lg shadow-[#52A7E0]/20 active:scale-95 transition-all disabled:opacity-50">
            {isLoading ? 'Wird gespeichert...' : isFlohmarkt ? 'Flohmarkt planen' : 'Inserat aufgeben'}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Reusable input field ─────────────────────────────────────────────────────
function InputField({ label, name, placeholder, type = 'text', fullWidth = true, onChange }) {
  return (
    <div className={fullWidth ? 'w-full' : 'flex-1'}>
      {label && <label className="block text-xs font-bold text-slate-900 mb-1 ml-1">{label}</label>}
      <input type={type} placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
        onChange={(e) => onChange(name, e.target.value)} />
    </div>
  );
}