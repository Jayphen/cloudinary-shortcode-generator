import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { CloudinaryContext, Image } from 'cloudinary-react';
import {DebounceInput} from 'react-debounce-input';

const cloudinary = window.cloudinary;

class App extends Component {
  state = {
    galleryTitle: '',
    galleryType: '2x2',
    galleryItems: []
  }
  titleChange = (title) => {
    this.setState({ galleryTitle: title });
    this.getGallery(title)
  }
  getGallery = (title) => {
    axios.get(`https://res.cloudinary.com/dxbygibug/image/list/${title.toLowerCase().replace(/ /g,"_")}.json`)
      .then(res => {
        this.setState({galleryItems: res.data.resources});
      })
      .catch(err => console.log("No matching tags, but that's okay"));
  }
  handleUploads = (error, result) => {
    this.setState({galleryItems: this.state.galleryItems.concat(result)});
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
          <GalleryFactory
            galleryTitle        = {this.state.galleryTitle}
            galleryItems        = {this.state.galleryItems}
            galleryType         = {this.state.galleryType}
            handleTitleChange   = {this.titleChange}
            handleTypeChange    = {this.typeChange}
            handleUploads       = {this.handleUploads}
            handleAltChange     = {this.handleAltChange}
            handleCaptionChange = {this.handleCaptionChange}
          />
        </form>
      </div>
    );
  }
}

class ResultField extends Component {
  getShortcode = (data) => (
    data.map((item) => (`
      "${item.height},
      ${item.width},
      https://res.cloudinary.com/dxbygibug/image/upload/v${item.version}/${item.public_id}.${item.format},
      "${item.alt || 'null'}",
      "${item.caption || 'null'}"
      "
    `.replace(/\s+/g, ' ')))
  )
  template = () => (`
    gallery {{ "${this.props.galleryTitle}" "${this.props.galleryType}" ${this.getShortcode(this.props.galleryItems)} }}
  `.replace(/\s+/g, ' '));

  render() {
    return (
      <div className="mt-8">
        <h3 className="mb-2">Your shortcode</h3>
        <textarea
          disabled={this.props.galleryItems.length === 0}
          value={this.props.galleryItems.length === 0 ? 'Upload some images first pls' : this.template()}
          className="block min-h-8 w-full g-white border border-grey-light hover:border-grey px-3 py-2 rounded shadow"
        />
      </div>
    )
  }
}

class GalleryFactory extends Component {
  render() {
    return (
      <div>
        <div className="flex">
          <div className="w-1/2 text-left">
            <GalleryTitle
              galleryTitle={this.props.galleryTitle}
              handleTitleChange={this.props.handleTitleChange}
            />
            <GalleryType
              handleTypeChange={this.props.handleTypeChange}
            />
            <GalleryUploader
              galleryTitle={this.props.galleryTitle}
              handleUploads={this.props.handleUploads}
            />
            <ResultField
              galleryTitle = {this.props.galleryTitle}
              galleryType  = {this.props.galleryType}
              galleryItems = {this.props.galleryItems}
            />
          </div>
          <div className="w-1/2">
            <Gallery
              galleryItems={this.props.galleryItems}
              handleAltChange={this.props.handleAltChange}
              handleCaptionChange={this.props.handleCaptionChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

class Gallery extends Component {
  render() {
    return (
      <CloudinaryContext cloudName="dxbygibug">
        {this.props.galleryItems.map((data) => (
          <GalleryItem
            id={data.public_id}
            key={data.public_id}
            handleAltChange={this.props.handleAltChange}
            handleCaptionChange={this.props.handleCaptionChange}
          />
        ))}
      </CloudinaryContext>
    )
  }
}

class GalleryItem extends Component {
  handleAltChange = (e) => {
    this.props.handleAltChange(this.props.id, e.target.value);
  }
  handleCaptionChange = (e) => {
    this.props.handleCaptionChange(this.props.id, e.target.value);
  }
  render() {
    return (
      <div>
        <Image publicId={this.props.id}></Image>
        <div>
          <div>
            <label htmlFor={`${this.props.id}_alt`}>Alt text <small>(for SEO)</small></label>
          </div>
          <DebounceInput
            id={`${this.props.id}_alt`}
            value={this.props.alt}
            debounceTimeout={300}
            onChange={this.handleAltChange} />
        </div>
        <div>
          <div>
            <label htmlFor={`${this.props.id}_caption`}>Caption text</label>
          </div>
          <DebounceInput
            id={`${this.props.id}_caption`}
            value={this.props.caption}
            debounceTimeout={300}
            onChange={this.handleCaptionChange} />
        </div>
      </div>
    )
  }
}

class GalleryTitle extends Component {
  handleTitleChange = (e) => {
    this.props.handleTitleChange(e.target.value);
  }

  render() {
    return (
      <div className="mb-6">
        <div>
          <label className="py-2 inline-block" htmlFor="gtitle">Gallery title</label>
        </div>
        <DebounceInput
          id="gtitle"
          value={this.props.galleryTitle}
          debounceTimeout={300}
          onChange={this.handleTitleChange}
          className="block appearance-none bg-white border border-grey-light hover:border-grey px-3 py-2 rounded shadow"
        />
      </div>
    )
  }
}

class GalleryType extends Component {
  handleTypeChange = (e) => {
    this.props.handleTypeChange(e.target.value);
  }

  getTypes = () => {
    const types = ['2x2', '4x4', '3x3'];
    return types.map((type, index) => (
      <option key={`${type}_${index}`} value={type}>{type}</option>
    ))
  };

  render() {
    return (
      <div className="mb-8">
        <div><label className="py-2 inline-block" htmlFor="gtype">Gallery type</label></div>
        <div className="inline-block relative">
          <select
            id="gtype"
            value={this.props.galleryType}
            onChange={this.handleTypeChange}
            className="block appearance-none bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow"
          >
            {this.getTypes()}
          </select>
          <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-slate">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    )
  }
}

class GalleryUploader extends Component {
  handleUploads = (error, result) => {
    this.props.handleUploads(error, result)
  }
  uploadWidget = (e) => {
    e.preventDefault();
    cloudinary.openUploadWidget({
      cloud_name:    'dxbygibug',
      upload_preset: 'cz7yoj6y',
      tags: [this.props.galleryTitle.toLowerCase().replace(/ /g,"_"),'uploader'],
      sources: ['local','url','facebook','google_photos'],
    }, this.handleUploads);
  }
  render() {
    return (
      <div>
        <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" onClick={this.uploadWidget}>Upload images</button>
      </div>
    )
  }
}

export default App;
