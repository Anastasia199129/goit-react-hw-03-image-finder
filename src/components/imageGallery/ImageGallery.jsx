import s from './imageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Button from '../button/Button';

const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

class ImageGallery extends Component {
  state = {
    images: null,
    page: '1',
    error: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ page: 1 });
      axios
        .get(
          `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )

        .then(response => {
          if (response.status === 200) {
            this.setState({ images: response.data.hits });
          }
          if (response.status === 400) {
            this.setState({ eror: 'картинки по вашему зыпросу не найдены' });
          }
        })
        .catch(error => console.error(error));
    }
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      page: [prevState] + 1,
    }));

    axios
      .get(
        `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )

      .then(response => {
        if (response.status === 200) {
          this.setState({ images: response.data.hits });
        }
        if (response.status === 400) {
          this.setState({ eror: 'картинки по вашему зыпросу не найдены' });
        }
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <section>
        <ul className={s.ImageGallery}>
          {Array.isArray(this.state.images) && <ImageGalleryItem imagesAray={this.state.images} />}
        </ul>
        {Array.isArray(this.state.images) && <Button onClick={this.onButtonClick} />}
      </section>
    );
  }
}

export default ImageGallery;
