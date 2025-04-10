import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ListSimulator from './components/ListSimulator';
import SearchSimulator from './components/SearchSimulator';
import ManageListings from './components/ManageListings';
import BookingPage from './components/BookingPage'; // Import BookingPage

function App() {
  const navigate = useNavigate();

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <Routes>
        <Route path="/" element={(
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1>Golf Simulator Marketplace</h1>
            <p>Find a simulator to rent, or list your own for others to use.</p>
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => navigate('/search')}
                style={buttonStyle}
              >
                🔍 Search for a Simulator
              </button>
              <button
                onClick={() => navigate('/list')}
                style={{ ...buttonStyle, marginLeft: '1rem' }}
              >
                📋 List Your Simulator
              </button>
              <button
                onClick={() => navigate('/manage')}
                style={{ ...buttonStyle, marginLeft: '1rem' }}
              >
                🛠 Manage Listings
              </button>
            </div>
          </div>
        )} />
        <Route path="/search" element={<SearchSimulator goHome={() => navigate('/')} />} />
        <Route path="/list" element={<ListSimulator goHome={() => navigate('/')} />} />
        <Route path="/manage" element={<ManageListings goHome={() => navigate('/')} userId={1} />} />
        <Route path="/book/:simId" element={<BookingPage />} /> {/* Add the booking route */}
      </Routes>
    </div>
  );
}

const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '1.1rem',
  cursor: 'pointer',
  borderRadius: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#f7f7f7',
  transition: '0.2s',
};

export default App;
