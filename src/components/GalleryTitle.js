import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import PropTypes from 'prop-types';

const GalleryTitle = ({handleTitleChange, galleryTitle}) => {
  return (
    <div className="mb-6">
      <div>
        <label className="py-2 inline-block" htmlFor="gtitle">Gallery title</label>
      </div>
      <DebounceInput
        id="gtitle"
        value={galleryTitle}
        debounceTimeout={300}
        onChange={handleTitleChange}
        className="text-input"
      />
    </div>
  )
}

GalleryTitle.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  galleryTitle: PropTypes.string.isRequired
}

export default GalleryTitle;
