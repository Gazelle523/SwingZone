import React, { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ListSimulator = ({ goHome }) => {
  console.log('Rendering ListSimulator component');
  const [simulator, setSimulator] = useState({
    location: '',
    price: '',
    description: '',
    availability: {}, // New state for availability
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSimulator({ ...simulator, [name]: value });
  };

  const handleAvailabilityChange = (day, field, value) => {
    setSimulator((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...(prev.availability[day] || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleDayToggle = (day) => {
    setSimulator((prev) => {
      const updated = { ...prev.availability };
      if (updated[day]) {
        delete updated[day];
      } else {
        updated[day] = { start: '08:00', end: '18:00' }; // default time range
      }
      return { ...prev, availability: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:8080/api/simulators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...simulator,
          price: parseFloat(simulator.price),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to list simulator. Please try again.');
      }

      const data = await response.json();
      setSuccessMessage(`Simulator "${data.location}" listed successfully!`);
      setSimulator({ location: '', price: '', description: '', availability: {} });
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
          <input type="text" name="location" value={simulator.location} onChange={handleChange} style={inputStyle} />
        </label>
        <label>
          Price (per hour):
          <input type="number" name="price" value={simulator.price} onChange={handleChange} style={inputStyle} />
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

        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Availability:</h4>
          {daysOfWeek.map((day) => {
            const isSelected = simulator.availability.hasOwnProperty(day);
            return (
              <div key={day} style={{ marginBottom: '0.5rem' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleDayToggle(day)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {day}
                </label>
                {isSelected && (
                  <div style={{ marginLeft: '1.5rem', display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <label>
                      From: 
                      <input
                        type="time"
                        value={simulator.availability[day]?.start || ''}
                        onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                        style={{ marginLeft: '0.25rem' }}
                      />
                    </label>
                    <label>
                      To: 
                      <input
                        type="time"
                        value={simulator.availability[day]?.end || ''}
                        onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                        style={{ marginLeft: '0.25rem' }}
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button type="submit" style={submitButtonStyle} disabled={loading}>
          {loading ? 'Listing...' : 'List Simulator'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
