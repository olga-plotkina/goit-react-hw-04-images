import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ preview, clickHandler }) => {
  return (
    <GalleryItem onClick={clickHandler}>
      <ItemImage src={preview} alt="" />
    </GalleryItem>
  );
};
