import React, { Component } from 'react';
import ResultField from './ResultField'
import GalleryType from './GalleryType'
import GalleryUploader from './GalleryUploader'
import GalleryTitle from './GalleryTitle'
import GalleryDemo from './GalleryDemo'
import Gallery from './Gallery'

export default class GalleryContainer extends Component {
  renderGalleryItems = () => (
    <GalleryDemo
      galleryType  = {this.props.galleryType}
      galleryItems = {this.props.galleryItems}
    />
  )
  render() {
    return (
      <div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-2 text-left">
            <GalleryTitle
              galleryTitle={this.props.galleryTitle}
              handleTitleChange={this.props.handleTitleChange}
            />
            <GalleryType
              handleTypeChange={this.props.handleTypeChange}
              galleryType  = {this.props.galleryType}
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
            {this.props.galleryItems.length > 0 ? this.renderGalleryItems() : ''}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Gallery
              galleryItems        = {this.props.galleryItems}
              handleAltChange     = {this.props.handleAltChange}
              handleCaptionChange = {this.props.handleCaptionChange}
              onDragEnd   = {this.props.handleDragEnd}
            />
          </div>
        </div>
      </div>
    )
  }
}

