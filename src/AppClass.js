import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';

class App extends Component {
  static defaultProps = {
    initialShowModal: false,
    initialquery: '',
    initialLargeImageURL: '',
    initialPage: 1,
    initialStatus: false,
  };

  static propTypes = {
    initialShowModal: PropTypes.bool.isRequired,
    initialquery: PropTypes.string.isRequired,
    initialLargeImageURL: PropTypes.string.isRequired,
    initialPage: PropTypes.number.isRequired,
    initialStatus: PropTypes.oneOf([
      false,
      'pending',
      'resolved',
      'rejected',
    ]),
  };

  state = {
    showModal: this.props.initialShowModal,
    query: this.props.initialquery,
    largeImageURL: this.props.initialLargeImageURL,
    page: this.props.initialPage,
    status: this.props.initialStatus,
  };

  onLoadMore = () => {
    let { page } = this.state;
    this.setState({ page: page + 1, status: 'pending' });
    setTimeout(() => {
      scroll.scrollToBottom();
    }, 700);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1, status: 'pending' });
  };

  handleStatus = status =>
    this.setState({ status: status });

  render() {
    const {
      query,
      showModal,
      largeImageURL,
      page,
      status,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={2000} />
        <ImageGallery
          query={query}
          toggleModal={this.toggleModal}
          setModalImage={this.setModalImage}
          page={page}
          handleStatus={this.handleStatus}
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
          <Button onClick={this.onLoadMore} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
