import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import { Modal } from './Modal';

import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    searchString: '',
    bigImageLink: '',
    isLoading: false,
  };

  handleSubmit = info => {
    this.setState({
      searchString: info.search.toLowerCase(),
    });
  };

  resetBigImageLink = () => {
    this.setState({ bigImageLink: '' });
  };

  setBigImageLink = link => {
    this.setState({ bigImageLink: link });
  };

  changeLoadStatus = () => {
    this.setState(s => ({ isLoading: !s.isLoading }));
  };
  render() {
    const { searchString, bigImageLink, isLoading } = this.state;
    // const gallerySize = isGalleryLoaded ? '100%' : 0;
    return (
      <>
        <Searchbar submitProp={this.handleSubmit} isSubmitting={isLoading} />
        <ImageGallery
          stringOfQuery={searchString}
          clickProp={this.setBigImageLink}
          disableButtonProp={this.changeLoadStatus}
        />
        {bigImageLink.length > 0 && (
          <Modal onClose={this.resetBigImageLink}>
            <img src={bigImageLink} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
