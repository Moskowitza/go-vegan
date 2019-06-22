import React from 'react';
import PropTypes from 'prop-types';
import './SavedComments.css';

const SavedComments = ({ postId, sanctuary, comment, deleteComment }) => (
  <ul className="list-group search-results">
    <li key={postId} className="list-group-item">
      <p>Sanctuary Name:{sanctuary}</p>
      <p>comment:{comment}</p>
      <button type="button" onClick={deleteComment}>
        delete comment
      </button>
    </li>
  </ul>
);
SavedComments.propTypes = {
  postId: PropTypes.string.isRequired,
  sanctuary: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default SavedComments;
