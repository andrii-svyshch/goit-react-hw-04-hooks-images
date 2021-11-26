import React, { useState, useCallback } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [status, setStatus] = useState('idle');

  const onLoadMore = () => {
    setPage(page => page + 1);
    setStatus('pending');
    setTimeout(() => {
      scroll.scrollToBottom();
    }, 700);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const setModalImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setStatus('idle');
  };

  const handleStatus = useCallback(
    status => setStatus(status),
    [],
  );

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2000} />
      <ImageGallery
        query={query}
        toggleModal={toggleModal}
        setModalImage={setModalImage}
        page={page}
        handleStatus={handleStatus}
        status={status}
      />

      {status === 'pending' && (
        <Loader
          type="ThreeDots"
          color="#3f51b5"
          height={50}
          width={80}
          timeout={3000}
        />
      )}

      {status === 'resolved' && (
        <Button onClick={onLoadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
