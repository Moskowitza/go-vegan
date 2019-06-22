import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Search from './pages/Search';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NewSanctuary from './pages/NewSanctuary';
import NavBarComp from './components/NavBarComp';

import Header from './components/Header';
import SanctuaryProfile from './components/SanctuaryProfile';
import Footer from './components/Footer';
import API from './utils/API';

class App extends Component {
  state = {
    user: null,
  };

  signIn = (email, password) => {
    API.loginUser({
      email,
      password,
    })
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => console.log(err));
  };

  logOut = () => {
    API.logoutUser()
      .then(res => {
        this.setState({ user: null });
        window.location.replace('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    const { user } = this.state;
    return (
      <Router>
        <React.Fragment>
          <NavBarComp user={user} logOut={this.logOut} />
          <Header />
          <Route
            exact
            path="/"
            render={props => <About {...props} user={user} />}
          />
          <Route
            exact
            path="/about"
            render={props => <About {...props} user={user} />}
          />
          <Route exact path="/dashboard" user={user} component={Dashboard} />
          <Route exact path="/search" component={Search} />
          <Route
            exact
            path="/signin"
            render={props => (
              <Signin {...props} user={user} signIn={this.signIn} />
            )}
          />
          <Route
            exact
            path="/signup"
            user={user}
            render={props => <Signup user={user} signIn={this.signUp} />}
          />
          <Route exact path="/sanctuary/:id" component={SanctuaryProfile} />
          <Route
            exact
            path="/newSanctuary"
            user={user}
            component={NewSanctuary}
          />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
