import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';
import GalleryDemoItem from './GalleryDemoItem';
import PropTypes from 'prop-types';

const GalleryDemo = (props) =>
  <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_NAME}>
    <h3 className="my-6">How it's gonna look:</h3>
    <div className={`gallery mw8 center blog-post--gallery gallery--${props.galleryType}`}>
      {props.galleryItems.map((data) => (
        <GalleryDemoItem
          id={data.public_id}
          key={data.public_id}
          landscape={data.width > data.height}
        />
      ))}
    </div>
  </CloudinaryContext>

GalleryDemo.propTypes = {
  galleryType: PropTypes.string,
  galleryItems: PropTypes.array
}

export default GalleryDemo;
