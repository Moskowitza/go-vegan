import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Comments from '../Comments';
import API from '../../utils/API';

class SanctuaryProfile extends Component {
  state = {
    sanctuary: {},
    user: {},
    existingComments: [],
    comment: '',
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    this.getUser();
    API.getSanctuary(params.id)
      .then(res => this.setState({ sanctuary: res.data }))
      .catch(err => console.log(err));
    this.getComments();
  }

  getUser = () => {
    API.getUser().then(res => {
      this.setState({
        user: res.data,
      });
    });
  };

  getComments = () => {
    const { match } = this.props;
    const { params } = match;
    API.getComments(params.id)
      .then(res => this.setState({ existingComments: res.data }))
      .catch(err => console.log(err));
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    event.preventDefault();
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = event => {
    const { comment, user, sanctuary } = this.state;
    event.preventDefault();
    const data = {
      comment,
      userId: user.userId,
      sanId: sanctuary.sanId,
    };

    API.saveComment(data)
      .then(res => this.getComments())
      .then(this.setState({ comment: '' }))
      .catch(err => {
        console.log(err);
        alert('Problem Commenting!');
      });
  };

  // const data = new FormData(event.target);

  render() {
    const { sanctuary, existingComments, user, comment } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <div className="card w-75 h-75 text-center">
              <h3>{sanctuary.name} Profile Page</h3>
            </div>
          </Row>
          <Row>
            <Col size="md-6">
              <div className="card w-100 h-100">
                <div className="card-body text-center">
                  <img
                    alt="sanctuary"
                    src={sanctuary.image}
                    className="img-fluid"
                  />
                  <h3>
                    Sanctuary Website:{' '}
                    <a href={sanctuary.animalWebsite}>Click Here! </a>
                  </h3>

                  <p className="text-left">
                    <strong> Details:</strong>
                    <ul>
                      <li>
                        {' '}
                        <b>Address:</b> {sanctuary.animalAddress}{' '}
                        <i className="material-icons">location_on</i>
                      </li>
                      <li>
                        {' '}
                        <b>Facebook:</b>{' '}
                        <a href={sanctuary.Facebook}>
                          {' '}
                          <i className="material-icons">link</i>
                        </a>
                      </li>
                      <li>
                        {' '}
                        <b> Instagram:</b>{' '}
                        <a href={sanctuary.Instagram}>
                          {' '}
                          <i className="material-icons">link</i>
                        </a>
                      </li>
                      <li>
                        {' '}
                        <b> Donation:</b>{' '}
                        <a href={sanctuary.DonationPage}>
                          {' '}
                          <i className="material-icons">link</i>
                        </a>
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </Col>

            <Col size="md-6">
              <div className="card w-100 h-100">
                <div className="card-body text-center">
                  {existingComments ? (
                    <div>
                      <p>Comments:</p>
                      {existingComments.map(singleComment => (
                        <Comments
                          key={singleComment.postId}
                          comment={singleComment.comment}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p> no comments </p>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              {user ? (
                <div className="card w-75 h-75">
                  <div className="card-body">
                    <label htmlFor="userComment">
                      Add Comment:
                      <input
                        id="userComment"
                        type="text"
                        className="form-control"
                        name="comment"
                        value={comment}
                        onChange={this.handleInputChange}
                      />
                    </label>
                    <button
                      className="btn btn-default btn-info"
                      type="submit"
                      onClick={this.handleFormSubmit}
                    >
                      Save Comment
                    </button>
                    <Link to="/Search">← Back to Search</Link>
                  </div>
                </div>
              ) : (
                <div className="card w-75 h-75">
                  <div className="card-body">log in to comment</div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
SanctuaryProfile.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default SanctuaryProfile;
