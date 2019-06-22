import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../utils/API';
import SavedSanctuaries from '../components/SavedSanctuaries/SavedSanctuaries';
import SavedComments from '../components/SavedComments';

class Dashboard extends Component {
  state = {
    user: null,
    usercomments: [],
    sanctuaries: [],
  };

  componentDidMount() {
    this.getUser();
    // this.getSavedSanctuaries()
  }

  getUser = () => {
    API.getUser().then(res => {
      // this does return the object with key pairs
      console.log(
        `dashboard, find user with Id : ${JSON.stringify(res.data.userId)}`
      );
      this.setState({
        user: res.data,
      });
      const { user } = this.state;
      this.getSavedSanctuaries({ userId: user.userId });
      this.getMyComments({ userId: user.userId });
    });
  };

  getSavedSanctuaries = data => {
    // event.preventDefault();
    API.getSavedSanctuaries(data).then(res => {
      // console.log("my loaded Sanctuaries" + JSON.stringify(res.data))
      this.setState({
        sanctuaries: res.data,
      });
    });
  };

  getMyComments = data => {
    // event.preventDefault();
    API.getMyComments(data).then(res => {
      console.log(`mycomments ${JSON.stringify(res.data)}`);
      this.setState({
        usercomments: res.data,
      });
    });
  };

  logoutUser = event => {
    event.preventDefault();
    API.logoutUser()
      .then(res => {
        console.log(res.data);
        if (res.data === true) {
          this.setState({ user: null });
        }
      })
      .catch(err => console.log(err));
  };

  deleteComment = data => {
    const { user } = this.state;
    API.deleteComment({
      postId: data.postId,
    })
      .then(res => {
        console.log(res);
      })
      .then(this.getMyComments({ userId: user.userId }));
  };

  render() {
    const { user, usercomments, sanctuaries } = this.state;
    return (
      <Container>
        <Row>
          <Col size="md-12" ClassName="center">
            <p />
            <h1>Welcome To Animal Sanctuaries!</h1>
          </Col>
        </Row>

        {user ? (
          <React.Fragment>
            <Row>
              <Col size="md-12" ClassName="center">
                <div className="card h-75 w-75 center">
                  <div className="card-body text-center">
                    <p>You are currently logged in as {user.email}</p>
                    <Link to="/search" className="btn btn-info">
                      search
                    </Link>
                    &nbsp;
                    <Link
                      to="/"
                      className="btn btn-danger"
                      onClick={this.logoutUser}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col size="md-12" />
              <div className="card-body" />
            </Row>
            <Row>
              <Col size="md-6">
                <h3>My Sanctuaries</h3>
                {sanctuaries.map(sanctuary => (
                  <SavedSanctuaries
                    id={sanctuary.sanId}
                    key={sanctuary.sanId}
                    logo={sanctuary.image}
                    name={sanctuary.name}
                    state={sanctuary.state}
                    sanId={sanctuary.sanId}
                  />
                ))}
              </Col>
              <Col size="md-6">
                <h3>My Comments</h3>
                {usercomments.map(obj => (
                  <SavedComments
                    key={obj.postId}
                    sanctuary={obj.Sanctuary.name}
                    comment={obj.comment}
                    deleteComment={() =>
                      this.deleteComment({ postId: obj.postId })
                    }
                  />
                ))}
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row>
              <Col size="md-12">
                <div
                  className="card  mx-auto text-center"
                  style={{ width: '50%' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Login for dashboard</h5>
                    <p className="card-text">
                      You're not logged in, so there is nothing to see here
                    </p>
                    <Link to="/signin" className="btn btn-info">
                      Login
                    </Link>
                    &nbsp;
                    <Link to="/signup" className="btn btn-primary">
                      Register
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Container>
    );
  }
}
export default Dashboard;
