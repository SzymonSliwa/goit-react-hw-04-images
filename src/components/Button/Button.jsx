import React from 'react';

import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <div className="loadMoreClass">
      <button
        type="button"
        className="Button"
        onClick={onLoadMore}
        value="Load more"
      >
        <span className="Button-label">Load more</span>
      </button>
    </div>
  );
};

Button.defaultProps = {
  value: 'Next page',
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
