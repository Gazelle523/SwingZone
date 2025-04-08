import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instead of sending a request, just show a default success message
    alert('Simulator listed successfully (default response)!');
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
