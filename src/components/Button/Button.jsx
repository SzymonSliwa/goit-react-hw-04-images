import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class Button extends Component {
  state = {};

  render() {
    return (
      <div className="loadMoreClass">
        <button
          type="button"
          className="Button"
          onClick={this.props.onLoadMore}
          value="Load more"
        >
          <span className="Button-label">Load more</span>
        </button>
      </div>
    );
  }
}

Button.defaultProps = {
  value: 'Next page',
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
