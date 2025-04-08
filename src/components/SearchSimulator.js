import React, { useState, useEffect } from 'react';

const SearchSimulator = () => {
  const [simulators, setSimulators] = useState([]);
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
  // Canned response
  const cannedResponse = [
    {
      location: 'Default Location',
      price: 0,
      description: 'This is a default response when no location is provided.'
    },
    {
      location: 'Another Location',
      price: 25,
      description: 'Another default response for demonstration purposes.'
    }
  ];

  // Set simulators to the canned response
  setSimulators(cannedResponse);
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
