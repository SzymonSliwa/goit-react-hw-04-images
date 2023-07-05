import React from 'react';

import { FidgetSpinner } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="Spinner">
      <FidgetSpinner height="200" width="200" />
    </div>
  );
};
