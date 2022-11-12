import React from 'react';
// import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, clickProp }) => {
  const clickHandlerFunction = (link, desc) => {
    clickProp(link, desc);
  };

  return (
    <>
      <GalleryList>
        {images.map(item => (
          <ImageGalleryItem
            key={item.id}
            preview={item.webformatURL}
            description={item.tags}
            clickHandler={() =>
              clickHandlerFunction(item.largeImageURL, item.tags)
            }
          ></ImageGalleryItem>
        ))}
      </GalleryList>
    </>
  );
};
