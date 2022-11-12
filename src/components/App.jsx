import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import { Modal } from './Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getCurrentPicture } from 'api/getCurrentPicture';
import Notiflix from 'notiflix';
import { Button } from './Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends React.Component {
  state = {
    searchString: '',
    bigImageLink: '',
    bigImageDescription: '',
    status: 'idle',
    page: 1,
    arrayOfPictures: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchString !== this.state.searchString) {
      try {
        this.setState({ status: 'pending' });
        const picturesInfo = await getCurrentPicture(
          this.state.searchString,
          this.state.page
        );
        if (picturesInfo.data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, we have not found anything');
          return;
        }
        this.setState({
          arrayOfPictures: picturesInfo.data.hits,
          status: 'resolved',
        });
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    }
    if (prevState.page < this.state.page) {
      try {
        this.setState({ status: 'pending' });
        const picturesInfo = await getCurrentPicture(
          this.state.searchString,
          this.state.page
        );
        if (picturesInfo.data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no more images');
          return;
        }
        this.setState(s => ({
          arrayOfPictures: [...s.arrayOfPictures, ...picturesInfo.data.hits],
          status: 'resolved',
        }));
      } catch (error) {
        Notiflix.Notify.failure(error);
      }
    }
  }

  handleSubmit = info => {
    this.setState({
      searchString: info.search.toLowerCase(),
    });
  };

  resetBigImageLink = () => {
    this.setState({ bigImageLink: '', bigImageDescription: '' });
  };

  setBigImageLink = (link, desc) => {
    this.setState({ bigImageLink: link, bigImageDescription: desc });
  };

  loadMore = () => {
    this.setState(s => ({ page: s.page + 1 }));
  };

  render() {
    const { bigImageLink, bigImageDescription, arrayOfPictures, status } =
      this.state;
    return (
      <>
        <Searchbar submitProp={this.handleSubmit} />
        {arrayOfPictures.length > 0 && (
          <ImageGallery
            images={arrayOfPictures}
            clickProp={this.setBigImageLink}
          />
        )}
        {status === 'pending' && <Loader />}
        {bigImageLink.length > 0 && (
          <Modal onClose={this.resetBigImageLink}>
            <img src={bigImageLink} alt={bigImageDescription} />
          </Modal>
        )}
        {arrayOfPictures.length >= 12 && status === 'resolved' && (
          <Button loadMore={this.loadMore} />
        )}
      </>
    );
  }
}
