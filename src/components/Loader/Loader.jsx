import React, { Component } from 'react';

import { FidgetSpinner } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <div className="Spinner">
        <FidgetSpinner height="200" width="200" />
      </div>
    );
  }
}
