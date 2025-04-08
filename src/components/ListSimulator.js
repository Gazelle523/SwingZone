import React, { useState } from 'react';

const ListSimulator = ({ goHome }) => {
  const [simulator, setSimulator] = useState({
    location: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSimulator({ ...simulator, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Simulator listed successfully (default response)!');
    // Optional: clear the form
    setSimulator({ location: '', price: '', description: '' });
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
            type="text"
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
        <button type="submit" style={submitButtonStyle}>List Simulator</button>
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
