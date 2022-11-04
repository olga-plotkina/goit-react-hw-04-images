import React from 'react';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <StyledOverlay onClick={this.handleBackdropClick}>
        <StyledModal>{this.props.children}</StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}
