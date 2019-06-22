import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './SearchResults.css';

const SearchResults = ({ sanId, logo, name, website }) => (
  <ul className="list-group search-results">
    <li key={sanId} className="list-group-item">
      <img alt="sanctuary" src={logo} className="img-fluid" />
      <h4>Sanctuary Name:{name}</h4>
      <h4>
        Sanctuary Website: <a href={website}>Click me! </a>{' '}
      </h4>
      <Link to={`/sanctuary/${sanId}`}>
        <strong>view profile</strong>
      </Link>
    </li>
  </ul>
);
SearchResults.propTypes = {
  sanId: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

export default SearchResults;
