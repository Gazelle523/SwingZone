import React, { useState, useEffect } from 'react';

const ManageListings = ({ goHome, userId }) => {
    console.log('Rendering ManageListings component');
  const [simulators, setSimulators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch simulators when the component mounts
  useEffect(() => {
    console.log('Fetching simulators for userId:', userId);
    if (userId) {
      const fetchSimulators = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/simulators/user/${userId}`);
          if (!response.ok) throw new Error('Failed to fetch simulators');
          const data = await response.json();
          setSimulators(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSimulators();
    }
  }, [userId]); 
  

  const handleEdit = (id) => {
    console.log("Edit simulator with ID:", id);
    // You can implement the edit functionality here
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/simulators/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setSimulators(simulators.filter(sim => sim.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <button onClick={goHome} style={backButtonStyle}>⬅ Back to Home</button>
      <h2 style={{ marginTop: '1rem' }}>Manage Your Simulators</h2>

      {/* Show loading spinner or error message */}
      {loading && <p>Loading simulators...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the existing simulators */}
      {simulators.length > 0 ? (
        <ul>
          {simulators.map((sim) => (
            <li key={sim.id}>
              <div>
                <h3>{sim.location}</h3>
                <p>{sim.description}</p>
                <p>${sim.price} per hour</p>
                <button onClick={() => handleEdit(sim.id)}>Edit</button>
                <button onClick={() => handleDelete(sim.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No simulators found. You haven't listed any simulators yet.</p>
      )}
    </div>
  );
};

const backButtonStyle = {
  backgroundColor: '#eee',
  border: '1px solid #ccc',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

export default ManageListings;
