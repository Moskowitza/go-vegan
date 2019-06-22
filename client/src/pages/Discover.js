import React, { Component } from 'react';
import API from '../utils/API';
import Card from '../components/Card';
import Alert from '../components/Alert';
import sanctuaries from '../sanctuaries.json';

class Discover extends Component {
  state = {
    sanctuaries,
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {}

  render() {
    return <div>Discover page</div>;
  }
}

export default Discover;
