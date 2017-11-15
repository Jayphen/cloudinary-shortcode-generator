import React from 'react';
import { Image } from 'cloudinary-react';

const GalleryDemoItem = (props) =>
  <div className={`gallery-item ${props.landscape ? 'gallery-item--landscape' : 'gallery-item--portrait'}`}>
    <Image publicId={props.id}></Image>
  </div>

export default GalleryDemoItem;
