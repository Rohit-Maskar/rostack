import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const EnrollForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enrollment data:', formData, 'Course:', course);
    navigate('/payment', { state: { ...formData, course } });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <div className="p-4 border rounded bg-white">
        <h4 className="text-center mb-3">Enroll in {course?.title}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" type="tel" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Save & Proceed to Payment</Button>
        </Form>
      </div>
    </Container>
  );
};

export default EnrollForm;
