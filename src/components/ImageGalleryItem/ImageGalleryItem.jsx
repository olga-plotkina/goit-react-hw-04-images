import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal';
import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ preview, description, bigImage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <GalleryItem onClick={toggleModal}>
      <ItemImage src={preview} alt={description} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={bigImage} alt={description} />
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
