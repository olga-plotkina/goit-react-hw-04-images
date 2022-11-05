import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ galleryArray, clickProp }) => {
  const clickHandlerFunction = link => {
    clickProp(link);
  };
  console.log(galleryArray);

  return (
    <GalleryList>
      {galleryArray.map(item => (
        <ImageGalleryItem
          key={item.id}
          preview={item.webformatURL}
          clickHandler={() => clickHandlerFunction(item.largeImageURL)}
        ></ImageGalleryItem>
      ))}
    </GalleryList>
  );
};
