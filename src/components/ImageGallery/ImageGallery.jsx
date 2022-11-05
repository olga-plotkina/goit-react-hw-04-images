import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export class ImageGallery extends React.Component {
  state = { activePictureId: null };
  clickHandlerFunction = index => {
    this.props.clickProp(index);
    this.props.toggleProp();
  };
  render() {
    return (
      <GalleryList>
        {this.props.galleryProp.map((item, index) => (
          <ImageGalleryItem
            key={item.id}
            preview={item.webformatURL}
            bigImage={item.largeImageURL}
            clickHandler={() => this.clickHandlerFunction(index)}
          ></ImageGalleryItem>
        ))}
      </GalleryList>
    );
  }
}
