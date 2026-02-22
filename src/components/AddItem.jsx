import React, { useState } from 'react';

const AddItem = ({ type, onCancel, onSave }) => {
  const isFlohmarkt = type === 'flohmarkt';
  
  // Состояние для всех возможных полей
  const [formData, setFormData] = useState({
    title: '',
    street: '',
    houseNumber: '',
    plz: '',
    city: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    orgType: '',
    fee: '',
    participants: '',
    topic: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    features: []
  });

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature) 
        : [...prev.features, feature]
    }));
  };

  const InputField = ({ label, name, placeholder, type = "text", fullWidth = true }) => (
    <div className={`${fullWidth ? 'w-full' : 'flex-1'}`}>
      {label && <label className="block text-xs font-bold text-slate-900 mb-1 ml-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#52A7E0]/30 transition-all"
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32">
      {/* HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-[3000] px-4 py-4 flex items-center justify-center">
         <h1 className="text-xl font-black text-[#1E293B]">
            {isFlohmarkt ? 'Flohmarkt planen' : 'Inserate aufgeben'}
         </h1>
      </header>

      <div className="max-w-[600px] mx-auto px-4 mt-6 space-y-6">
        
        {/* ФОТО */}
        <div className="w-full h-32 border-2 border-dashed border-[#52A7E0] rounded-[1.5rem] flex flex-col items-center justify-center bg-white text-[#52A7E0] cursor-pointer">
          <i className="bi bi-camera text-2xl mb-1"></i>
          <span className="font-bold text-sm">Fotos hinzufügen</span>
        </div>

        {/* ФОРМА ДЛЯ FLOHMARKT */}
        {isFlohmarkt ? (
          <div className="space-y-4">
            <InputField name="title" placeholder="Name des Flohmarkts*" />
            
            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Adresse*</label>
              <div className="flex gap-2">
                <InputField name="street" placeholder="Strasse" />
                <InputField name="houseNumber" placeholder="Nummer" fullWidth={false} />
              </div>
              <div className="flex gap-2">
                <InputField name="plz" placeholder="PLZ" />
                <InputField name="city" placeholder="Stadt" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Datum und Uhrzeit*</label>
              <div className="flex items-center gap-2">
                <input type="date" className="flex-1 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" />
                <span className="text-sm">von</span>
                <input type="time" className="w-24 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" />
                <span className="text-sm">bis</span>
                <input type="time" className="w-24 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none" />
              </div>
            </div>

            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none appearance-none">
              <option>Organisationart*</option>
              <option>Privat</option>
              <option>Gewerblich</option>
            </select>

            <div className="flex gap-2">
              <InputField name="fee" placeholder="Gebühr in Euro*" />
              <InputField name="participants" placeholder="Teilnehmeranzahl*" />
            </div>

            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none">
              <option>Thema des Flohmarkts</option>
            </select>

            <textarea 
              placeholder="Beschreibung"
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none h-24 resize-none"
            />

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Features</label>
              <div className="flex gap-2">
                {['+ Parkplätze', '+ Barrierefrei', '+ Essen'].map(feature => (
                  <button 
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${formData.features.includes(feature) ? 'bg-[#52A7E0] text-white border-[#52A7E0]' : 'bg-[#D1E1F0] text-[#52A7E0] border-transparent'}`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ФОРМА ДЛЯ INSERATE */
          <div className="space-y-4">
            <InputField name="title" placeholder="Titel*" />
            
            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none">
              <option>Kategorie*</option>
            </select>
            
            <select className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none">
              <option>Zustand*</option>
            </select>

            <InputField name="price" placeholder="Preis" type="number" />

            <textarea 
              placeholder="Beschreibung"
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none h-32 resize-none"
            />

            <div className="space-y-2">
              <label className="text-xs font-bold ml-1">Adresse*</label>
              <div className="flex gap-2">
                <InputField name="plz" placeholder="PLZ*" />
                <InputField name="city" placeholder="Stadt*" />
              </div>
              <div className="flex gap-2">
                <InputField name="street" placeholder="Strasse" />
                <InputField name="houseNumber" placeholder="Nummer" fullWidth={false} />
              </div>
            </div>
          </div>
        )}

        {/* КНОПКИ ДЕЙСТВИЯ */}
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onCancel}
            className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-white active:scale-95 transition-all"
          >
            Abbrechen
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="flex-1 py-3 bg-[#52A7E0] text-white rounded-xl font-bold shadow-lg shadow-[#52A7E0]/20 active:scale-95 transition-all"
          >
            {isFlohmarkt ? 'Flohmarkt planen' : 'Inserate aufgeben'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;