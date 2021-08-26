import { Component } from 'react';
import s from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  onChangeHandler = e => {
    this.setState({ value: e.currentTarget.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
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
