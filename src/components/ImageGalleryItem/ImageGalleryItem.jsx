import propTypes from 'prop-types';

import React from 'react';

const ImageGalleryItem = ({ gallery, onClickImg }) => {
  return (
    <li className="ImageGalleryItem ">
      <img
        src={gallery.webformatURL}
        alt={gallery.tags}
        onClick={() => onClickImg(gallery.largeImageURL)}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  gallery: propTypes.shape({
    webformatURL: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
  }).isRequired,
  onClickImg: propTypes.func.isRequired,
};

export default ImageGalleryItem;
