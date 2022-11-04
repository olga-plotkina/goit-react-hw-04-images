import { Searchbar } from './Searchbar/Searchbar';
// import { Notiflix } from 'notiflix';
import React from 'react';
import { Modal } from './Modal';
import { getCurrentPicture } from '../api/getCurrentPicture';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    array: [],
    page: 1,
    showModal: false,
  };

  handleSubmit = info => {
    getCurrentPicture(info.search).then(dataPictures => {
      // if (dataPictures.data.hits.length === 0) {
      //   Notiflix.Notify.failure(
      //     'Sorry, there are no images matching your search query. Please try again.'
      //   );
      //   return;
      // }
      // Notiflix.Notify.success(
      //   `Hooray! We found ${dataPictures.data.totalHits} images.`
      // );
      this.setState({ array: dataPictures.data.hits });
    });

    // return dataPictures.data.hits;
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { showModal } = this.state;

    return (
      <>
        <Searchbar submitProp={this.handleSubmit} />
        <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button>
        <ImageGallery galleryProp={this.state.array} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            jhbjbjh
            <img src="" alt="" />
            <button type="button" onClick={this.toggleModal}>
              Закрити
            </button>
          </Modal>
        )}
      </>
    );
  }
}
