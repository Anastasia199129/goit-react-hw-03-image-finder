import s from './imageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import axios from 'axios';

const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: '',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      axios
        .get(
          `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )

        .then(response => {
          if (response.status === 200) {
            this.setState({ images: response });
            console.log('mmmmm', response);
          }
          if (response.status === 400) {
            this.setState({ eror: 'картинки по вашему зыпросу не найдены' });
          }
        })
        .catch(error => console.error(error));
    }
  }

  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.state.images.indexOf(0) && <ImageGalleryItem imagesAray={this.state.images} />}
      </ul>
    );
  }
}

export default ImageGallery;
