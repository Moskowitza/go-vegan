import React from 'react';
import PropTypes from 'prop-types';
import './Comments.css';

const Comments = ({ postId, comment }) => (
  <ul className="list-group search-results">
    <li key={postId} className="list-group-item">
      <p>{comment}</p>
    </li>
  </ul>
);
Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};
export default Comments;
