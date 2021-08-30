import React from 'react';
import { Component } from 'react';
import s from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  largeImgesModal = largeImageURL => {
    this.props.onClick(largeImageURL);
  };

  render() {
    return this.props.imagesAray.map(({ id, webformatURL, largeImageURL }) => (
      <li
        key={id}
        className={s.ImageGalleryItem}
        onClick={() => this.largeImgesModal(largeImageURL)}
      >
        <img src={webformatURL} alt="" className={s.ImageGalleryItemImage} />
      </li>
    ));
  }
}

export default ImageGalleryItem;
