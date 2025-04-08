import React from 'react';
import ListSimulator from './components/ListSimulator';
import SearchSimulator from './components/SearchSimulator';

function App() {
  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Golf Simulator Marketplace</h1>
      <p>Search for local golf simulators to rent, or list your own!</p>
      
      <div style={{ marginTop: '2rem' }}>
        <SearchSimulator />
      </div>

      <hr style={{ margin: '3rem 0' }} />

      <div>
        <ListSimulator />
      </div>
    </div>
  );
}

export default App;