//client/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="justify-content-between px-3">
      <Navbar.Brand href="/">My Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          {isAuth && <Nav.Link as={NavLink} to="/new">Create Post</Nav.Link>}
          <Nav.Link as={NavLink} to="/myblog">Blog Page</Nav.Link>
          {!isAuth ? (
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          ) : (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
