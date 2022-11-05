import { Searchbar } from './Searchbar/Searchbar';
// import { Notiflix } from 'notiflix';
import React from 'react';
import { Modal } from './Modal';
import { getCurrentPicture } from '../api/getCurrentPicture';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    searchResultArray: [],
    page: 1,
    showModal: false,
    activePictureIndex: null,
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
      this.setState({ searchResultArray: dataPictures.data.hits });
    });
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };
  resetActiveIndex = () => {
    this.setState({ activePictureIndex: null });
  };

  activeIndexHandler = index => {
    this.setState({ activePictureIndex: index });
  };
  render() {
    const { searchResultArray, activePictureIndex } = this.state;

    return (
      <>
        <Searchbar submitProp={this.handleSubmit} />
        {searchResultArray.length > 0 && (
          <ImageGallery
            galleryProp={searchResultArray}
            clickProp={this.activeIndexHandler}
          />
        )}
        ;
        {activePictureIndex > 0 && (
          <Modal onClose={this.resetActiveIndex}>
            <img
              src={searchResultArray[activePictureIndex].largeImageURL}
              alt=""
            />
            <button type="button" onClick={this.resetActiveIndex}>
              Закрити
            </button>
          </Modal>
        )}
      </>
    );
  }
}
