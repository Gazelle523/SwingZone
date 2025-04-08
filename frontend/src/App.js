import React, { useState } from 'react';
import ListSimulator from './components/ListSimulator';
import SearchSimulator from './components/SearchSimulator';
import ManageListings from './components/ManageListings';

function App() {
  const [view, setView] = useState(null); // 'search' | 'list' | 'manage' | null
 
  const goHome = () => {
    setView(null);
  };

  const renderContent = () => {
    if (view === 'search') return <SearchSimulator goHome={goHome} />;
    if (view === 'list') return <ListSimulator goHome={goHome} />;
    if (view === 'manage') return <ManageListings goHome={goHome} userId={1} />;

    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Golf Simulator Marketplace</h1>
        <p>Find a simulator to rent, or list your own for others to use.</p>
        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => setView('search')} style={buttonStyle}>🔍 Search for a Simulator</button>
          <button onClick={() => setView('list')} style={{ ...buttonStyle, marginLeft: '1rem' }}>📋 List Your Simulator</button>
          <button onClick={() => setView('manage')} style={{ ...buttonStyle, marginLeft: '1rem' }}>🛠 Manage Listings</button>
        </div>
      </div>
    );
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f7f7f7',
    transition: '0.2s',
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      {renderContent()}
    </div>
  );
}

export default App;
