import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../utils/API';

// Switch this to REGISTER and create a seperate LOGIN
class Signup extends Component {
  // Setting the initial values of this.state.email and this.state.password
  state = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value,
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSubmit = event => {
    const { username, password, email, firstname, lastname } = this.state;
    event.preventDefault();
    // alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    // We need to have an HTTP request to our path
    API.saveUser({
      username,
      password,
      email,
      firstname,
      lastname,
    })
      .then(res => {
        console.log(`res ${res.data}`);
        window.location.replace(res.data);
      })
      .catch(err => {
        console.log(err);
        alert(`Problem signing in: ${err}`);
      });
  };

  // const data = new FormData(event.target);

  render() {
    const { email, firstname, lastname, username, password } = this.state;
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col size="md-12">
              <div className="card w-50 h-50">
                <div className="card-header text-center">
                  <p>Follow your favorite Animal Sanctuary!</p>
                  <p>Sign up for an account</p>
                </div>

                <form className="text-center" action="/sigup">
                  <div className="form-group">
                    <div className="card-body text-left">
                      <span>
                        <label htmlFor="email">
                          Email Address:
                          <input
                            id="email"
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={this.handleInputChange}
                          />
                        </label>

                        <label htmlFor="firstname">
                          {' '}
                          First Name:
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            value={firstname}
                            onChange={this.handleInputChange}
                          />
                        </label>

                        <label htmlFor="lastname">
                          Last Name:
                          <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            value={lastname}
                            onChange={this.handleInputChange}
                          />
                        </label>

                        <label htmlFor="username">
                          Username:
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={username}
                            onChange={this.handleInputChange}
                          />
                        </label>

                        <label htmlFor="password">
                          {' '}
                          Password:
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={this.handleInputChange}
                          />
                        </label>

                        <p className="align-items-end">
                          <Link
                            className="btn btn-info"
                            onClick={this.handleFormSubmit}
                            to="/dashboard"
                          >
                            Submit
                          </Link>
                          &nbsp;
                          <Link className="btn" to="/">
                            Cancel
                          </Link>
                        </p>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Signup);
