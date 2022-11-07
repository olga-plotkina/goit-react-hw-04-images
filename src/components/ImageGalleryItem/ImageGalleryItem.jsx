import PropTypes from 'prop-types';
import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ preview, clickHandler, description }) => {
  return (
    <GalleryItem onClick={clickHandler}>
      <ItemImage src={preview} alt={description} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  preview: PropTypes.string,
  clickHandler: PropTypes.func,
  description: PropTypes.string,
};
