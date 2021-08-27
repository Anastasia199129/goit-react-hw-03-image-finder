import { Component } from 'react';
import s from './button.module.css';
/* window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: 'smooth',
}); */
class Button extends Component {
  onClickFunc = e => {
    console.log(e);
  };
  render() {
    return (
      <button className={s.button} type="button" onClick={this.onClickFunc}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
