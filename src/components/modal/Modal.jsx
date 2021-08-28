import s from './modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalOnEscape);
  }

  closeModalOnEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  omBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.omBackdropClick}>
        <div className={s.modal}>
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
