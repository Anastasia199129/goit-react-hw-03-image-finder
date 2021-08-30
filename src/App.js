import './App.css';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import Searchbar from './components/searchbar/Searchbar';
import ImageGallery from './components/imageGallery/ImageGallery';

class App extends Component {
  static propTypes = {
    imageName: PropTypes.string,
  };

  state = {
    imageName: '',
  };

  onSubmithandler = data => {
    this.setState({ imageName: data.value });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmithandler} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

export default App;
