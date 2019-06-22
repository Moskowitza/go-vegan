import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
// import { LinkContainer } from 'react-router-bootstrap';
import './NavBarComp.css';

const NavBarComp = ({ user, logOut }) => (
  <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <Link className="nav-link" to="/">
        HOME
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link>
          {' '}
          <Link className="nav-link" to="/about">
            About
          </Link>
        </Nav.Link>
        <Nav.Link>
          {' '}
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </Nav.Link>
        <Nav.Link>
          {' '}
          <Link className="nav-link" to="/search">
            Search
          </Link>
        </Nav.Link>
        {user ? (
          <>
            <Nav.Link>
              {' '}
              <Link className="nav-link" to="/newSanctuary">
                Contribute
              </Link>
            </Nav.Link>
            <Nav.Link>
              {' '}
              <Button variant="danger" onClick={logOut}>
                Log Out
              </Button>
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link>
              {' '}
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            </Nav.Link>
            <Nav.Link>
              {' '}
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
NavBarComp.propTypes = {
  logOut: PropTypes.func.isRequired,
  user: PropTypes.shape.isRequired,
};

export default NavBarComp;
// createdAt:
// "2019-06-19T21:07:34.000Z"
// email:
// "aaron@aaron.com"
// firstname:
// "aaron"
// last_login:
// null
// lastname:
// "aaron"
// password:
// "$2a$10$PyXcp4pWJm8.7ey7oaT2Xe2PhfsSb.qyrkBRAXzrS0hmrguwdfwSK"
// status:
// "active"
// updatedAt:
// "2019-06-19T21:07:34.000Z"
// userId:
// 1
// username:
// "aaron"
