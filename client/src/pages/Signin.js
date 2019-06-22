import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import API from '../utils/API';
// import Card from '../components/Card';

// Switch this to REGISTER and create a seperate LOGIN
class Signin extends Component {
  // Setting the initial values of this.state.email and this.state.password

  state = {
    email: '',
    password: '',
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = event => {
    const { email, password } = this.state;
    const { signIn } = this.props;
    event.preventDefault();
    if (email && password) {
      signIn(email, password);
    }
  };

  render() {
    const { user, email, password } = this.state;
    return user ? (
      <div>hello{user}</div>
    ) : (
      <div>
        <Container>
          <Row className="justify-content-start">
            <Col size="md-12" className="center ">
              {/* FORM HAS ACTION TO SIGNIN route */}
              <div className="card w-50 h-50">
                <div className="card-header">
                  Please Login or Return to the homepage
                </div>
                <div className="form-group">
                  <form className="card-body">
                    <span>
                      <p> Email Address:</p>
                      <p className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          value={email}
                          onChange={this.handleInputChange}
                        />
                      </p>
                      {/* <label >User Name</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}

                  /> */}
                      <p>Password:</p>
                      <p>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          value={password}
                          onChange={this.handleInputChange}
                        />
                      </p>
                      <p />
                      <Link
                        className="btn btn-primary"
                        to="/dashboard"
                        onClick={this.handleFormSubmit}
                      >
                        Login
                      </Link>
                      &nbsp;
                      <Link className="btn" to="/">
                        Cancel
                      </Link>
                    </span>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Signin.propTypes = {
  signIn: PropTypes.func.isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
};

export default withRouter(Signin);
