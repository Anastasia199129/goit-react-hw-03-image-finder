import React from 'react';
import { Component } from 'react';
import s from './button.module.css';

class Button extends Component {
  render() {
    return (
      <button className={s.button} type="button" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
