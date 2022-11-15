import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, children }) => {
  // function componentDidMount() {
  //   window.addEventListener('keydown', handleKeyDown);
  // }

  // function componentWillUnmount() {
  //   window.removeEventListener('keydown', handleKeyDown);
  // }

  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  // };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <StyledOverlay onClick={handleBackdropClick}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
