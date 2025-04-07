// src/components/SearchSimulator.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchSimulator = () => {
  const [simulators, setSimulators] = useState([]);
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/simulators?location=${location}`);
      setSimulators(response.data);
    } catch (error) {
      console.error('Error fetching simulators', error);
      alert('Failed to fetch simulators');
    }
  };

  return (
    <div>
      <h2>Search for Golf Simulators Near You</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h3>Results:</h3>
        <ul>
          {simulators.map((simulator, index) => (
            <li key={index}>
              <strong>{simulator.location}</strong> - ${simulator.price} per hour
              <p>{simulator.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchSimulator;
