import './App.css';
import { Component } from 'react';
import Searchbar from './components/searchbar/Searchbar';
import Button from './components/button/Button';
import ImageGallery from './components/imageGallery/ImageGallery';
// import { ToastContainer } from 'react-toastify';

// import Modal from './components/modal/Modal';

class App extends Component {
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
        {/* <ToastContainer autoClose={3000} /> */}
        <Button text="Load more" />
        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;
