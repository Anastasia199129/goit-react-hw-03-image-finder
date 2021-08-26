import './App.css';
import { Component } from 'react';
import Searchbar from './components/searchbar/Searchbar';

// const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';
// https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12

class App extends Component {
  onSubmithandler = data => {
    console.log(data);
  };
  render() {
    return <Searchbar onSubmit={this.onSubmithandler} />;
  }
}

export default App;
