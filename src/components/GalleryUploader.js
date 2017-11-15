import React, { Component } from 'react';
import PropTypes from 'prop-types';

const cloudinary = window.cloudinary;

export default class GalleryUploader extends Component {
  static propTypes = {
    handleUploads: PropTypes.func.isRequired,
    galleryTitle: PropTypes.string.isRequired
  }
  handleUploads = (error, result) => {
    this.props.handleUploads(error, result)
  }
  uploadWidget = (e) => {
    e.preventDefault();
    cloudinary.openUploadWidget({
      cloud_name:    process.env.REACT_APP_CLOUDINARY_NAME,
      upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
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

