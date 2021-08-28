import { Component } from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    return this.props.imagesAray.map(({ id, webformatURL }) => (
      <li key={id} className={s.ImageGalleryItem} onClick={this.props.onClick}>
        <img src={webformatURL} alt="" className={s.ImageGalleryItemImage} />
      </li>
    ));
  }
}

export default ImageGalleryItem;
