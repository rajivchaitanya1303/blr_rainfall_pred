// src/App.js

import React from 'react';
import PredictionForm from './components/PredictionForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">🌧️ Bengaluru Rainfall Predictor</h1>
      <PredictionForm />
    </div>
  );
}

export default App;
