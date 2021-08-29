import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import s from './searchbar.module.css';
import axios from 'axios';
import Button from '../button/Button';
import ImageGallery from '../imageGallery/ImageGallery';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Modal from '../modal/Modal';

const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

// https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12

class Searchbar extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    searchValue: '',
    loading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      console.log(prevState.page, this.state.page);
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
            console.log(this.state.page);
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
      toast.error('🦄 Заполните поле поиска!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      // alert('заполните поле ввода');
      return;
    }

    if (this.state.value !== this.state.searchValue) {
      this.setState({ page: 1, images: [] });
    }
    this.setState({ searchValue: this.state.value });
    console.log(this.state.value);
    console.log(this.state.searchValue);

    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ images: response.data.hits });
          console.log(this.state.images);
        }
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
    console.log(e);

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
        {this.state.loading && <Loader type="Hearts" color="#00BFFF" height={80} width={80} />}
        <ToastContainer />
        {this.state.images.length !== 0 && (
          <ImageGallery arrayImages={this.state.images}>
            <ImageGalleryItem imagesAray={this.state.images} onClick={this.onItemClick} />
          </ImageGallery>
        )}

        {this.state.images.length !== 0 && <Button text="Load more" onClick={this.onButtonClick} />}
        {this.state.showModal && (
          <Modal onClose={this.togleModal} imagesArray={this.state.imageName} />
        )}
      </section>
    );
  }
}

export default Searchbar;
