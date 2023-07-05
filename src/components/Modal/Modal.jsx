import propTypes from 'prop-types';
import React, { useEffect } from 'react';

export const Modal = ({ image, description, onClose }) => {
  // componentDidMount() {

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  // componentWillUnmount() {

  // const handleBackdropClick = e => {
  //  if (e.currentTarget === e.target) {
  //     onClose();
  //    }
  //  };

  const closeModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };

  // render() {
  //  const { image, description } = this.props;

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={image} alt={description} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
};
