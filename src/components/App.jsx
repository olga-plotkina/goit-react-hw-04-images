import React from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/';
import { ImageGallery } from './ImageGallery';
import { getCurrentPicture } from 'api/getCurrentPicture';
import { Button } from './Button/';
import { Loader } from 'components/Loader';
import { useState, useEffect } from 'react';

export function App() {
  const [searchString, setSearchString] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [arrayOfPictures, setArrayofPictures] = useState([]);
  const [error, setError] = useState('false');

  useEffect(async () => {
    try {
      setStatus('pending');
      const picturesInfo = await getCurrentPicture(searchString, page);
      if (picturesInfo.data.hits.length === 0) {
        Notiflix.Notify.failure('Sorry, we have not found anything');
        return;
      }
      setArrayofPictures(picturesInfo.data.hits);
      setStatus('resolved');
    } catch (error) {
      setStatus('fail');
      setError('true');
      Notiflix.Notify.failure(error);
    }
  }, [status, arrayOfPictures]);
  // async function componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchString !== this.state.searchString) {
  //     try {
  //       setStatus('pending');
  //       const picturesInfo = await getCurrentPicture(searchString, page);
  //       if (picturesInfo.data.hits.length === 0) {
  //         Notiflix.Notify.failure('Sorry, we have not found anything');
  //         return;
  //       }
  //       setArrayofPictures(picturesInfo.data.hits);
  //       setStatus('resolved');
  //     } catch (error) {
  //       setStatus('fail');
  //       setError('true');
  //       Notiflix.Notify.failure(error);
  //     }
  //   }
  //   if (prevState.page < this.state.page) {
  //     try {
  //       setStatus('pending');
  //       const picturesInfo = await getCurrentPicture(searchString, page);
  //       if (picturesInfo.data.hits.length === 0) {
  //         Notiflix.Notify.failure('Sorry, there are no more images');
  //         return;
  //       }
  //       this.setState(s => ({
  //         arrayOfPictures: [...s.arrayOfPictures, ...picturesInfo.data.hits],
  //         status: 'resolved',
  //       }));
  //     } catch (error) {
  //       this.setState({ error: true, status: 'fail' });
  //       Notiflix.Notify.failure(error);
  //     }
  //   }
  // }

  const handleSubmit = info => {
    setSearchString(info.search.toLowerCase());
  };

  // resetBigImageLink = () => {
  //   this.setState({ bigImageLink: '', bigImageDescription: '' });
  // };

  // setBigImageLink = (link, desc) => {
  //   this.setState({ bigImageLink: link, bigImageDescription: desc });
  // };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  return (
    <>
      <Searchbar submitProp={handleSubmit} />
      {status === 'fail' && <div> Something wrong </div>}
      {arrayOfPictures.length > 0 && status !== 'fail' && (
        <ImageGallery images={arrayOfPictures} />
      )}
      {status === 'pending' && <Loader />}
      {/* {bigImageLink.length > 0 && (
          <Modal onClose={this.resetBigImageLink}>
            <img src={bigImageLink} alt={bigImageDescription} />
          </Modal>
        )} */}
      {arrayOfPictures.length >= 12 && status === 'resolved' && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
}
