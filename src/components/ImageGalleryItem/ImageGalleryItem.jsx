import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ preview, bigImage }) => {
  return (
    <GalleryItem>
      <ItemImage src={preview} alt="" />
    </GalleryItem>
  );
};
