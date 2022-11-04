import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ galleryProp }) => {
  return (
    <GalleryList>
      {galleryProp.map(item => (
        <ImageGalleryItem
          key={item.id}
          preview={item.webformatURL}
          bigImage={item.largeImageURL}
        ></ImageGalleryItem>
      ))}
    </GalleryList>
  );
};
