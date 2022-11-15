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
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchString === '') {
      return;
    }
    async function getPicturesInfo() {
      try {
        setStatus('pending');
        const picturesInfo = await getCurrentPicture(searchString, page);
        if (picturesInfo.data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, we have not found anything');
          return;
        }
        setArrayofPictures(s => [...s, ...picturesInfo.data.hits]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        setError(error);
      }
    }
    getPicturesInfo();
  }, [page, searchString]);

  const handleSubmit = info => {
    setPage(1);
    if (searchString === info.search.toLowerCase()) {
      return;
    }
    setSearchString(info.search.toLowerCase());
    setArrayofPictures([]);
  };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  return (
    <>
      <Searchbar submitProp={handleSubmit} />
      {status === 'rejected' && <div> Something wrong: {error} </div>}
      {arrayOfPictures.length > 0 && status !== 'fail' && (
        <ImageGallery images={arrayOfPictures} />
      )}
      {status === 'pending' && <Loader />}
      {arrayOfPictures.length >= 12 && status === 'resolved' && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
}
