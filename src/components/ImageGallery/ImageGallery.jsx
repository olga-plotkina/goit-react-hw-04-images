import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { getCurrentPicture } from '../../api/getCurrentPicture';
import Notiflix from 'notiflix';

export class ImageGallery extends React.Component {
  state = { arrayOfPictures: [], loading: false };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stringOfQuery !== this.props.stringOfQuery) {
      this.setState({ loading: true, arrayOfPictures: [] });
      getCurrentPicture(this.props.stringOfQuery)
        .then(picturesInfo => {
          if (picturesInfo.data.hits.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          this.setState({ arrayOfPictures: picturesInfo.data.hits });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }
  clickHandlerFunction = link => {
    this.props.clickProp(link);
  };
  // getCurrentPicture(this.props.string).then(pictureInfo => {
  //   this.setState({arrayOfPictures: pictureInfo.data.hits})});

  render() {
    const { loading, arrayOfPictures } = this.state;
    return (
      <GalleryList>
        {loading && <div>загружаем</div>}
        {!arrayOfPictures.length && !loading && <li>Здесь ничего нет</li>}
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
