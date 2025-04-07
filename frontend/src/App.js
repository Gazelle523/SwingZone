// src/App.js
import React from 'react';
import ListSimulator from './components/ListSimulator';
import SearchSimulator from './components/SearchSimulator';

function App() {
  return (
    <div className="App">
      <h1>Golf Simulator Rental</h1>
      <ListSimulator />
      <SearchSimulator />
    </div>
  );
}

export default App;