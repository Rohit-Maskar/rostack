import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './AppNavbar.css'; // 👈 Import custom CSS
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AppNavbar = () => {
  const { role, setRole } = useAuth(); // 👈 use context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null); // 👈 clear context
    navigate('/');
  };
  return (
    <Navbar expand="lg" className="app-navbar border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="brand-text">📚 Heetro</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>

            {!role && (
              <>
                <Nav.Link href="/register" className="nav-link-custom">Register</Nav.Link>
                <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
              </>
            )}
            {role && (
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
