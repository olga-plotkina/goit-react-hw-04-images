import React from 'react';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { getCurrentPicture } from '../../api/getCurrentPicture';
import Notiflix from 'notiflix';

export class ImageGallery extends React.Component {
  state = { arrayOfPictures: [], status: 'idle' };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stringOfQuery !== this.props.stringOfQuery) {
      this.props.disableButtonProp();
      this.setState({ status: 'pending' });
      getCurrentPicture(this.props.stringOfQuery).then(picturesInfo => {
        if (picturesInfo.data.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        this.props.disableButtonProp();
        this.setState({
          status: 'resolved',
          arrayOfPictures: picturesInfo.data.hits,
        });
      });
    }
  }
  clickHandlerFunction = link => {
    this.props.clickProp(link);
  };

  render() {
    const { arrayOfPictures, status } = this.state;

    if (status === 'idle') {
      return <div>Здесь ничего нет</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <GalleryList>
          {arrayOfPictures.map(item => (
            <ImageGalleryItem
              key={item.id}
              preview={item.webformatURL}
              clickHandler={() => this.clickHandlerFunction(item.largeImageURL)}
            ></ImageGalleryItem>
          ))}
        </GalleryList>
      );
    }
  }
}
