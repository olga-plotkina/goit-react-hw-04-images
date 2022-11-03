// import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import { Modal } from './Modal';

export class App extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { showModal } = this.state;

    return (
      <>
        <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button>
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
