import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const EnrollForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: ''});
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;

  const[error, setError] = useState();
  const[success, setSuccess] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enrollment data:', formData, 'Course:', course);
    // TODO: Send register data to backend
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      setSuccess('User registered successfully!');
      const { token, userDetails } = response.data;
      const role = userDetails.authorities[0].authority; 
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed.');
    }
    navigate(`/payment/${encodeURIComponent(course?.title)}`, { state: { ...formData, course } });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <div className="p-4 border rounded bg-white">
        <h4 className="text-center mb-3">Enroll in {course?.title}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="name" type ="text" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" type="tel" onChange={handleChange} required />
          </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Save & Proceed to Payment</Button>
        </Form>
      </div>
    </Container>
  );
};

export default EnrollForm;
