import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext'
import axiosInstance from '../util/AxiosInstance';

const EnrollForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;

  const { setRole } = useAuth();

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [statusCode, setStatusCode] = useState(null)

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
      const response = await axiosInstance.post('http://localhost:8080/api/auth/register', formData);
      setSuccess('User registered successfully!');
      const { token, userDetails } = response.data;
      const role = userDetails.authorities[0].authority;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setRole(role)
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        const { status, message, error } = err.response.data;
         setStatusCode(status)
        // Example: status=409 => email already in use
        if (status === 409) {
          setError(message || 'Email already in use');
        } else if (status === 400) {
          setError(message || 'Validation error');
        } else if (status === 401) {
          setError('Invalid email or password');
        } else {
          setError(message || 'Something went wrong');
        }
      } else {
        setError('Server not responding. Please try again later.');
      }
    }
    if (success)
      navigate(`/payment/${encodeURIComponent(course?.title)}`, { state: { ...formData, course } });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {statusCode === 409 && (
        <div className="alert alert-warning">
          Email already in use.
          <Button
            variant="link"
            onClick={() => navigate('/login', { state: { fromEnroll: true, course } })}
          >
            Login directly
          </Button>
        </div>
      )}

      <div className="p-4 border rounded bg-white">
        <h4 className="text-center mb-3">Enroll in {course?.title}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="name" type="text" onChange={handleChange} required />
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
