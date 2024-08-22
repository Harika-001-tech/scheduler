import React, { useState } from 'react';
import BookingForm from './components/BookingForm.js';
import MentorList from './components/MentorList.js';
import PaymentPage from './components/PaymentPage.js';

const App = () => {
    const [mentors, setMentors] = useState([]);
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleAreaOfInterestChange = (areaOfInterest) => {
        fetch(`/api/mentors?areaOfInterest=${areaOfInterest}`)
            .then((response) => response.json())
            .then((data) => setMentors(data))
            .catch((error) => console.error('Error fetching mentors:', error));
    };

    const handleFormSubmit = ({ areaOfInterest, duration, selectedMentor }) => {
        const selectedMentorDetails = mentors.find((mentor) => mentor.id === selectedMentor);
        const totalCost = calculateCost(duration, selectedMentorDetails.isPremium);

        setBookingDetails({
            areaOfInterest,
            duration,
            selectedMentor: selectedMentorDetails,
            totalCost,
        });

        // Make API call to backend to save the booking
        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ areaOfInterest, duration, selectedMentor }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle success
                console.log('Booking successful:', data);
            })
            .catch((error) => console.error('Error booking session:', error));
    };

    const calculateCost = (duration, isPremium) => {
        const rate = isPremium ? 50 : 30;
        return (rate / 60) * duration;
    };

    return (
        <div>
            {!bookingDetails ? (
                <>
                    <BookingForm 
                        onSubmit={handleFormSubmit} 
                        onAreaOfInterestChange={handleAreaOfInterestChange} 
                    />
                    <MentorList 
                        mentors={mentors} 
                        onSelectMentor={(mentorId) => console.log('Selected mentor ID:', mentorId)} 
                    />
                </>
            ) : (
                <PaymentPage bookingDetails={bookingDetails} />
            )}
        </div>
    );
};

export default App;
