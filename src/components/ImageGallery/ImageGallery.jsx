import React from 'react';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { getCurrentPicture } from '../../api/getCurrentPicture';
import Notiflix from 'notiflix';
import { Button } from 'components/Button/Button';
import { Link, animateScroll as scroll } from 'react-scroll';

export class ImageGallery extends React.Component {
  state = { arrayOfPictures: [], page: 1, status: 'idle' };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stringOfQuery !== this.props.stringOfQuery) {
      this.setState({ page: 1 });
    }
    if (
      prevProps.stringOfQuery !== this.props.stringOfQuery ||
      prevState.page !== this.state.page
    ) {
      this.props.disableButtonProp();
      this.setState({ status: 'pending' });
      getCurrentPicture(this.props.stringOfQuery, this.state.page).then(
        picturesInfo => {
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
        }
      );
    }
  }

  loadMore = () => {
    this.setState(s => ({ page: s.page + 1 }));
  };

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
        <>
          <GalleryList>
            {arrayOfPictures.map(item => (
              <ImageGalleryItem
                key={item.id}
                preview={item.webformatURL}
                clickHandler={() =>
                  this.clickHandlerFunction(item.largeImageURL)
                }
              ></ImageGalleryItem>
            ))}
          </GalleryList>
          <Button loadMore={this.loadMore} />
        </>
      );
    }
  }
}
