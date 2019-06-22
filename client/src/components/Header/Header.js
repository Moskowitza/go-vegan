import React from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './Header.css';

const Header = () => (
  <Container fluid>
    <Row className="header">
      <Col>
        <h1>Animal Sanctuaries</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Website for Animal lovers</h2>
      </Col>
    </Row>
  </Container>
);

export default Header;
