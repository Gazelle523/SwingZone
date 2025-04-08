import React, { useState } from 'react';

const ListSimulator = ({ goHome }) => {
  const [simulator, setSimulator] = useState({
    location: '',
    price: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSimulator({ ...simulator, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous success message

    try {
      const response = await fetch('http://localhost:8080/api/simulators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...simulator,
          price: parseFloat(simulator.price), // Ensure price is sent as a number
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to list simulator. Please try again.');
      }

      const data = await response.json();
      setSuccessMessage(`Simulator "${data.location}" listed successfully!`); // Set success message
      setSimulator({ location: '', price: '', description: '' }); // Clear the form
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <button onClick={goHome} style={backButtonStyle}>⬅ Back to Home</button>
      <h2 style={{ marginTop: '1rem' }}>List Your Golf Simulator for Rent</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={simulator.location}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Price (per hour):
          <input
            type="number"
            name="price"
            value={simulator.price}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={simulator.description}
            onChange={handleChange}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>
        <button type="submit" style={submitButtonStyle} disabled={loading}>
          {loading ? 'Listing...' : 'List Simulator'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
      </form>
    </div>
  );
};

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

export default ListSimulator;