import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: ''
  });

  const navigate = useNavigate();

  const { setRole } = useAuth();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form submitted:', formData);
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
      setRole(role)
      navigate(`/`);
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        const { status, message, error } = err.response.data;

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
  };

  return (
    <div className="register-background py-5">
      <Container style={{ maxWidth: '500px' }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="p-4 rounded shadow border bg-white">
          <h3 className="mb-4 text-center">Register</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
