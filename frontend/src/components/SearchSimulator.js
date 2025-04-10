import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSimulator = ({ goHome }) => {
  const navigate = useNavigate();

  const [simulators, setSimulators] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/simulators`);
      if (!response.ok) {
        throw new Error('Failed to fetch simulators');
      }
      const data = await response.json();
      setSimulators(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (simId) => {
    navigate(`/book/${simId}`);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <button onClick={goHome} style={backButtonStyle}>⬅ Back to Home</button>
      <h2 style={{ marginTop: '1rem' }}>Search for Golf Simulators Near You</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location"
          style={inputStyle}
        />
        <button onClick={handleSearch} style={submitButtonStyle}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Results:</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : simulators.length === 0 ? (
          <p>No results found. Try a different location!</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {simulators.map((simulator, index) => (
              <li
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '4px',
                }}
              >
                <strong>{simulator.location}</strong> - ${simulator.price} per hour
                <p style={{ marginTop: '0.5rem' }}>{simulator.description}</p>
                <button
                  onClick={() => handleBookClick(simulator.simulatorId)}
                  style={bookButtonStyle}
                >
                  Book Now
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  marginTop: '0.25rem',
};

const backButtonStyle = {
  backgroundColor: '#eee',
  border: '1px solid #ccc',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

const submitButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const bookButtonStyle = {
  marginTop: '0.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default SearchSimulator;