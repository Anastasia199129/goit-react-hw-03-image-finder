import React from 'react';
// import { toast } from 'react-toastify';
import { Component } from 'react';
import s from './searchbar.module.css';

// https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12

class Searchbar extends Component {
  state = {
    value: '',
  };

  onChangeHandler = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      alert('заполните поле ввода');
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <header className={s.Searchbar} onSubmit={this.onSubmitForm}>
        <form className={s.SearchForm}>
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
    );
  }
}

export default Searchbar;
