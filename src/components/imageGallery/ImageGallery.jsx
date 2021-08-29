import s from './imageGallery.module.css';
// import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import Loader from 'react-loader-spinner';
// import axios from 'axios';
// import Button from '../button/Button';
// import Modal from '../modal/Modal';

// const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

const ImageGallery = ({ children }) => {
  return (
    <section>
      <ul className={s.ImageGallery}> {children}</ul>
    </section>
  );
};

export default ImageGallery;
