import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => (
  <div>
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-12">
          <div>
            <h1>Welcome To animal sanctuaries!</h1>
          </div>
          <div className="card w-100 h-100">
            <p />
            <p className="card-body text-center">
              Farm animal sanctuaries are safe havens for animals who have
              endured the victimization of factory farming. Visiting a sanctuary
              is an absolute must for anyone truly devoted to animal protection.
              The opportunity to meet a cow face-to-face or rub the belly of a
              pig is an incredibly moving experience. Very few animals trapped
              in factory farms and our food system ever experience freedom, but
              sanctuaries offer an island of kindness in this sea of cruelty.
            </p>
            <p>
              <img
                className="rounded mx-auto d-block"
                src="http://imagizer.imageshack.com/v2/500x500q90/673/7wO0v7.jpg"
                alt="girl kissing sheep"
              />
            </p>

            <p className="card-body text-center">
              Click the search button to find animal sacturaries or login to see
              saved sacturaries
              <br />
              <br />
              <Link to="/search" className="btn btn-info">
                Search
              </Link>
              &nbsp;
              <Link to="/signin" className="btn btn-primary">
                Login
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default About;
