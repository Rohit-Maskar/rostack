import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { setRole } = useAuth();


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);

      const { token, userDetails } = response.data;
      const role = userDetails.authorities[0].authority; // This will be "ROLE_ADMIN" or "ROLE_USER"

      console.log("response data after login"+ response.data)
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setSuccess('Login successful!');
       setRole(role)
      navigate('/')

    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-background py-5">
      <Container style={{ maxWidth: '500px' }}>
        <div className="p-4 rounded shadow border bg-white">
          <h3 className="mb-4 text-center">Login</h3>
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
