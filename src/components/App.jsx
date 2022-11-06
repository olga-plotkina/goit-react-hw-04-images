import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import { Modal } from './Modal';

import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    searchString: '',
    searchResultArray: [],
    page: 1,
    bigImageLink: '',
    isGalleryLoaded: false,
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.searchResultArray !== this.state.searchResultArray) {
  //     this.setState({ isGalleryLoaded: false });
  //   }
  // }

  componentDidMount() {
    this.setState({ isGalleryLoaded: true });
  }
  handleSubmit = info => {
    // if (dataPictures.data.hits.length === 0) {
    //   Notiflix.Notify.failure(
    //     'Sorry, there are no images matching your search query. Please try again.'
    //   );
    //   return;
    // }
    // Notiflix.Notify.success(
    //   `Hooray! We found ${dataPictures.data.totalHits} images.`
    // );
    this.setState({ searchString: info.search.toLowerCase() });
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };
  resetBigImageLink = () => {
    this.setState({ bigImageLink: '' });
  };

  setBigImageLink = link => {
    this.setState({ bigImageLink: link });
  };
  render() {
    const { searchString, bigImageLink } = this.state;
    // const showloader = searchResultArray.length > 0 && !isGalleryLoaded;
    // const gallerySize = isGalleryLoaded ? '100%' : 0;
    return (
      <>
        <Searchbar submitProp={this.handleSubmit} />
        <ImageGallery
          // width={gallerySize}
          // height={gallerySize}
          stringOfQuery={searchString}
          // galleryArray={searchResultArray}
          clickProp={this.setBigImageLink}
        />
        {bigImageLink.length > 0 && (
          <Modal onClose={this.resetBigImageLink}>
            <img src={bigImageLink} alt="" />
            <button type="button" onClick={this.resetBigImageLink}>
              Закрити
            </button>
          </Modal>
        )}
        {/* {showloader && <h2> Загружаем галерею</h2>} */}
      </>
    );
  }
}
