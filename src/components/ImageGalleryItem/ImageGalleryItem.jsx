import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal';
import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ preview, description, bigImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GalleryItem onClick={() => setIsModalOpen(true)}>
        <ItemImage src={preview} alt={description} />
      </GalleryItem>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <img src={bigImage} alt={description} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  preview: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
