import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal';
import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <GalleryItem onClick={toggleModal}>
      <ItemImage src={this.props.preview} alt={this.props.description} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={this.props.bigImage} alt={this.props.description} />
        </Modal>
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  preview: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
