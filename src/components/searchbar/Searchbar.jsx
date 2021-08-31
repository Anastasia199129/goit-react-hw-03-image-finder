import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Component } from 'react';
import LoaderHearts from '../loader/Loader';
import s from './searchbar.module.css';
import axios from 'axios';
import Button from '../button/Button';
import ImageGallery from '../imageGallery/ImageGallery';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Modal from '../modal/Modal';

const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string,
    images: PropTypes.array,
    page: PropTypes.number,
    searchValue: PropTypes.string,
    loading: PropTypes.bool,
    showModal: PropTypes.bool,
    largeImeges: PropTypes.string,
  };

  state = {
    value: '',
    images: [],
    page: 1,
    searchValue: '',
    loading: false,
    showModal: false,
    largeImeges: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      if (prevState.value !== this.state.value) {
        this.setState({
          loading: true,
        });
      }
      axios
        .get(
          `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then(response => {
          if (response.status === 200) {
            this.setState(prevState => ({
              images: [...prevState.images, ...response.data.hits],
            }));
            this.setState({ loading: false });
            if (this.state.images.length > 11) {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
            }
          }
          if (response.status === 400) {
            this.setState({ eror: 'картинки по вашему зыпросу не найдены' });
          }
        })
        .catch(error => console.error(error));
    }
  }

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      toast.warn('Заполните поле поиска!');
      return;
    }

    if (this.state.value !== this.state.searchValue) {
      this.setState({ page: 1, images: [] });
    }

    this.setState({ searchValue: this.state.value });
    this.setState({
      loading: true,
    });

    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ images: response.data.hits });
          if (this.state.images.length === 0) {
            toast.error('По такому запросу картинки не найденны!');
          }
        }
        this.setState({
          loading: false,
        });
        if (response.status === 400) {
          this.setState({ eror: 'картинки по вашему зыпросу не найдены' });
        }
      })
      .catch(error => console.error(error));

    this.props.onSubmit(this.state);
    this.reset();
  };

  onButtonClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onChangeHandler = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  reset = () => {
    this.setState({
      value: '',
    });
  };

  togleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  onItemClick = e => {
    this.setState({ largeImeges: e });
    this.togleModal();
  };

  render() {
    return (
      <section>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={this.onSubmitForm}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              onChange={this.onChangeHandler}
              className={s.SearchFormInput}
              type="text"
              value={this.state.value}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
        {this.state.loading && <LoaderHearts />}
        {this.state.images.length !== 0 && (
          <ImageGallery arrayImages={this.state.images}>
            <ImageGalleryItem imagesAray={this.state.images} onClick={this.onItemClick} />
          </ImageGallery>
        )}

        {this.state.images.length !== 0 && <Button text="Load more" onClick={this.onButtonClick} />}
        {this.state.showModal && (
          <Modal onClose={this.togleModal} modalImg={this.state.largeImeges} />
        )}
      </section>
    );
  }
}

export default Searchbar;
