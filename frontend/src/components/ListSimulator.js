// src/components/ListSimulator.js
import React, { useState } from 'react';
import axios from 'axios';

const ListSimulator = () => {
  const [simulator, setSimulator] = useState({
    location: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSimulator({ ...simulator, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a backend API that handles adding simulators
      await axios.post('/api/simulators', simulator);
      alert('Simulator listed successfully!');
    } catch (error) {
      console.error('Error listing simulator', error);
      alert('Failed to list simulator');
    }
  };

  return (
    <div>
      <h2>List Your Golf Simulator for Rent</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={simulator.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price (per hour):
          <input
            type="text"
            name="price"
            value={simulator.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={simulator.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">List Simulator</button>
      </form>
    </div>
  );
};

export default ListSimulator;
