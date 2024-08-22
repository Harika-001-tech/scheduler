import React from 'react';

const PaymentPage = ({ bookingDetails }) => {
    const { selectedMentor, duration, totalCost } = bookingDetails;

    return (
        <div>
            <h3>Payment Confirmation</h3>
            <p>Mentor: {selectedMentor.name}</p>
            <p>Duration: {duration} minutes</p>
            <p>Total Cost: ${totalCost}</p>
            <button>Proceed to Payment</button>
        </div>
    );
};

export default PaymentPage;
