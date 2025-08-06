import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './AppNavbar.css'; // 👈 Import custom CSS

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="app-navbar border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="brand-text">📚 dhisMas</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/register" className="nav-link-custom">Register</Nav.Link>
            <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
