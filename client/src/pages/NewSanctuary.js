import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../utils/API';

// Switch this to REGISTER and create a seperate LOGIN
class NewSanctuary extends Component {
  //  Setting the initial values of this.state.email and this.state.password

  state = {
    user: [],
    name: '',
    image: '',
    state: '',
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    API.getUser().then(res => {
      this.setState({ user: res.data });
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSubmit = event => {
    event.preventDefault();
    const { name, image, state } = this.state;
    const { history } = this.props;
    // alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    // We need to have an HTTP request to our path
    API.saveSanctuary({
      name,
      image,
      state,
    })
      .then(res => {
        if (res.data === true) {
          history.push('/');
        } else {
          // however you want to handle an error.
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
        alert('Problem Creating Sanctuary');
      });
  };

  render() {
    const { user, name, image, state } = this.state;
    return (
      <React.Fragment>
        {user ? (
          <Container>
            <Row className="justify-content-center">
              <Col size="md-12">
                <div className="card w-50 h-50">
                  {/* FORM HAS ACTION TO SIGNUP route */}
                  <form action="/auth/newSanctuary">
                    <div className="card-header">Register a New Sanctuary</div>
                    <span className="card-body">
                      <p>
                        <label htmlFor="name">
                          Name
                          <input
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleInputChange}
                          />
                        </label>
                      </p>
                      <p>
                        <label htmlFor="imageLink">
                          Image Link
                          <input
                            id="imageLink"
                            className="form-control"
                            type="text"
                            name="image"
                            value={image}
                            onChange={this.handleInputChange}
                          />
                        </label>
                      </p>
                      <p>
                        <label htmlFor="state">
                          State
                          <input
                            id="state"
                            className="form-control"
                            type="text"
                            name="state"
                            value={state}
                            onChange={this.handleInputChange}
                          />
                        </label>
                      </p>

                      <Link
                        className="btn btn-info"
                        onClick={this.handleFormSubmit}
                        to="/auth/newSanctuary"
                      >
                        Add New Sanctuary
                      </Link>
                      <Link className="btn" to="/">
                        Cancel
                      </Link>
                    </span>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row className="justify-content-center">
              <Col size="md-12">
                <div className="card ">Login to create a Sanctuary</div>
              </Col>
            </Row>
          </Container>
        )}
      </React.Fragment>
    );
  }
}
NewSanctuary.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NewSanctuary);
