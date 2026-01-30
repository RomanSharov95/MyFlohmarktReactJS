import React, { useState } from 'react';

export default function AddItem({ onCancel, onSave }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="text-left space-y-6">
      <h2 className="text-2xl font-black">Neues Angebot</h2>
      <input 
        className="w-full border-b-2 p-2 text-xl outline-none focus:border-emerald-500" 
        placeholder="Was verkaufst du?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        className="w-full border-b-2 p-2 text-xl outline-none focus:border-emerald-500" 
        placeholder="Preis in €"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button 
        onClick={() => onSave({ title, price })}
        className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold uppercase"
      >
        Hinzufügen
      </button>
      <button onClick={onCancel} className="w-full text-gray-400">Abbrechen</button>
    </div>
  );
}