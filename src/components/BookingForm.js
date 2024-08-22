import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = ({ onBookingSuccess }) => {
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [sessionDuration, setSessionDuration] = useState('30');
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (areaOfInterest) {
      // Fetch mentors based on the selected area of interest
      axios.get(`/api/mentors`)
        .then(response => {
          setMentors(response.data);
        })
        .catch(error => {
          console.error("Error fetching mentors:", error);
        });
    }
  }, [areaOfInterest]);

  useEffect(() => {
    // Calculate the cost based on session duration and mentor type
    const baseCost = sessionDuration === '30' ? 30 : sessionDuration === '45' ? 45 : 60;
    const premiumCost = selectedMentor && selectedMentor.isPremium ? 20 : 0;
    setCost(baseCost + premiumCost);
  }, [sessionDuration, selectedMentor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      areaOfInterest,
      mentorId: selectedMentor.id,
      sessionDuration,
    };

    axios.post('/api/bookings', bookingData)
      .then(response => {
        // Redirect to payment page or show success message
        onBookingSuccess(response.data);
      })
      .catch(error => {
        console.error("Error creating booking:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Area of Interest:</label>
        <select value={areaOfInterest} onChange={(e) => setAreaOfInterest(e.target.value)}>
          <option value="">Select...</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="art">Art</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div>
        <label>Mentor:</label>
        <select value={selectedMentor.id || ''} onChange={(e) => {
          const mentor = mentors.find(mentor => mentor.id === e.target.value);
          setSelectedMentor(mentor);
        }}>
          <option value="">Select a mentor...</option>
          {mentors.map(mentor => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name} {mentor.isPremium && '(Premium)'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Session Duration:</label>
        <select value={sessionDuration} onChange={(e) => setSessionDuration(e.target.value)}>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>

      <div>
        <p>Total Cost: ${cost}</p>
      </div>

      <button type="submit">Book Session</button>
    </form>
  );
};

export default BookingForm;
