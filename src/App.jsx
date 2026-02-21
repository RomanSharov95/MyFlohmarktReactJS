import React, { useState } from 'react';
import AddItem from './components/AddItem';
import ProductCard from './components/ProductCard';
import logo from './assets/logo.png'; // Укажи правильное расширение .png, .svg или .jpg
import Home from './components/Home';

function App() {
  // Пока оставляем минимум логики, чтобы просто увидеть главную
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;