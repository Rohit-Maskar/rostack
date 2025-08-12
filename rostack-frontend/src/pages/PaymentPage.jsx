import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import CheckoutButton from '../components/CheckoutButton';

const PaymentPage = () => {
  const location = useLocation();
  const course = location.state;

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <div className="p-4 border rounded bg-white text-center">
        <h4>Pay for {course?.title}</h4>
        <p><strong>Amount:</strong> ₹{course?.price}</p>
        <Alert variant="info">Scan QR code with PhonePe or GPay to complete the payment</Alert>
        <img src="https://via.placeholder.com/300x300?text=UPI+QR+Code" alt="QR Code" className="img-fluid mb-3" />
        <CheckoutButton amount={11} />
        {/* Later replace above with actual QR code / Razorpay UPI */}
      </div>
    </Container>
  );
};

export default PaymentPage;
