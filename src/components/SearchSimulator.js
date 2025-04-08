import React, { useState } from 'react';

const SearchSimulator = ({ goHome }) => {
  const [simulators, setSimulators] = useState([]);
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Canned response
    const cannedResponse = [
      {
        location: 'Default Location',
        price: 0,
        description: 'This is a default response when no location is provided.',
      },
      {
        location: 'Another Location',
        price: 25,
        description: 'Another default response for demonstration purposes.',
      },
    ];

    // Set simulators to the canned response
    setSimulators(cannedResponse);
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
          Search
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Results:</h3>
        {simulators.length === 0 ? (
          <p>No results yet. Enter a location and click Search!</p>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Reusing styles from ListSimulator
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

export default SearchSimulator;