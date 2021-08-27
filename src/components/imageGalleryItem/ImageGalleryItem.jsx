import { Component } from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    return this.props.imagesAray.hits.map(({ id, webformatURL }) => (
      <li key={id} className={s.ImageGalleryItem}>
        <img src={webformatURL} alt="" className={s.ImageGalleryItemImage} />
      </li>
    ));
  }
}

export default ImageGalleryItem;
