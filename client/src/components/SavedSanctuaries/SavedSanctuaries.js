import React from 'react';
import './SavedSanctuaries.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SavedSanctuaries = ({ key, logo, name, sanId }) => (
  <ul className="list-group search-results">
    <li key={key} className="list-group-item">
      <img alt="sanctuary" src={logo} className="img-fluid" />
      <h3>Sanctuary Name:{name}</h3>
      <Link to={`/sanctuary/${sanId}`}>
        <strong>view profile</strong>
      </Link>
    </li>
  </ul>
);
SavedSanctuaries.propTypes = {
  key: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sanId: PropTypes.string.isRequired,
};

export default SavedSanctuaries;
