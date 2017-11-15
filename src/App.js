import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import GalleryContainer from './components/GalleryContainer'

// Re-order array given the array, the item being
// moved, and where it is being moved to
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component {
  state = {
    galleryTitle: '',
    galleryType: 'alternating',
    galleryItems: []
  }
  onDragEnd = (result) => {
     // dropped outside the list
    if (!result.destination) {
      return;
    }

    const galleryItems = reorder(
      this.state.galleryItems,
      result.source.index,
      result.destination.index
    );

    this.setState({ galleryItems });
  }
  titleChange = (e) => {
    const title = e.target.value;
    this.setState({ galleryTitle: title });
    this.getGallery(title)
  }
  getGallery = (title) => {
    axios.get(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_NAME}/image/list/${title.toLowerCase().replace(/ /g,"_")}.json`)
      .then(res => {
        this.setState({galleryItems: res.data.resources});
      })
      .catch(err => console.log("No matching tags, but that's okay"));
  }
  handleUploads = (error, result) => {
    if (!error) {
      this.setState({galleryItems: this.state.galleryItems.concat(result)});
    } else {
      console.log(error);
    }
  }
  handleAltChange = (id, val) => {
    this.setState({
      galleryItems: this.state.galleryItems.map((galleryItem) => {
        if (id === galleryItem.public_id) {
          return Object.assign({}, galleryItem, {
            alt: val
          })
        } else {
          return galleryItem;
        }
      })
    })
  }
  handleCaptionChange = (id, val) => {
    this.setState({
      galleryItems: this.state.galleryItems.map((galleryItem) => {
        if (id === galleryItem.public_id) {
          return Object.assign({}, galleryItem, {
            caption: val
          })
        } else {
          return galleryItem;
        }
      })
    })
  }
  typeChange = (type) => {
    this.setState({ galleryType: type });
  }
  render() {
    return (
      <div className="App container mx-auto px-4 py-8">
        <h1 className="mb-4">Let's create a lovely gallery</h1>
        <form>
          <GalleryContainer
            galleryTitle        = {this.state.galleryTitle}
            galleryItems        = {this.state.galleryItems}
            galleryType         = {this.state.galleryType}
            handleTitleChange   = {this.titleChange}
            handleTypeChange    = {this.typeChange}
            handleUploads       = {this.handleUploads}
            handleAltChange     = {this.handleAltChange}
            handleCaptionChange = {this.handleCaptionChange}
            handleDragEnd       = {this.onDragEnd}
          />
        </form>
      </div>
    );
  }
}


export default App;
