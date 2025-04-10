import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { simId } = useParams(); // This retrieves the simulator ID from the URL
  const navigate = useNavigate();

  const [simulator, setSimulator] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    hours: 1,
  });

  useEffect(() => {
    const fetchSimulatorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/simulators/${simId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch simulator details');
        }
        const data = await response.json();
        setSimulator(data); // Update state with simulator details
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchSimulatorDetails();
  }, [simId]);

  const handleBookingChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Get the selected date and time as startTime
    const startDateTime = new Date(`${bookingDetails.date}T${bookingDetails.time}`);
  
    // Calculate endTime by adding the selected hours to the startDateTime
    const endDateTime = new Date(startDateTime.getTime() + bookingDetails.hours * 60 * 60 * 1000); // hours to milliseconds
  
    // Format the date-time in ISO format for query parameters
    const startTimeFormatted = startDateTime.toISOString();
    const endTimeFormatted = endDateTime.toISOString();
  
    // Send the booking request with simId as a path param and startTime & endTime as query params
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/book/${simId}?startTime=${startTimeFormatted}&endTime=${endTimeFormatted}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to book simulator');
      }
  
      const data = await response.json();
      alert(`Successfully booked! Booking ID: ${data.bookingId}`);
      navigate('/'); // Navigate back to home after successful booking
    } catch (err) {
      alert(err.message);
    }
  };
  

  if (!simulator) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Book Simulator: {simulator.location}</h2>
      <p>Price: ${simulator.price} per hour</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={bookingDetails.date}
          onChange={handleBookingChange}
          required
          style={inputStyle}
        />
        <br />
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={bookingDetails.time}
          onChange={handleBookingChange}
          required
          style={inputStyle}
        />
        <br />
        <label htmlFor="hours">Hours:</label>
        <input
          type="number"
          id="hours"
          name="hours"
          min="1"
          value={bookingDetails.hours}
          onChange={handleBookingChange}
          required
          style={inputStyle}
        />
        <br />
        <button type="submit" style={bookButtonStyle}>Confirm Booking</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  marginTop: '0.25rem',
  marginBottom: '1rem',
};

const bookButtonStyle = {
  marginTop: '1rem',
  backgroundColor: '#28a745',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default BookingPage;
