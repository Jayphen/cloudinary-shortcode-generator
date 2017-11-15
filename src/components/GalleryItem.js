import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';
import { Image } from 'cloudinary-react';

class GalleryItem extends Component {
  handleAltChange = (e) => {
    this.props.handleAltChange(this.props.id, e.target.value);
  }
  handleCaptionChange = (e) => {
    this.props.handleCaptionChange(this.props.id, e.target.value);
  }
  // Patched onKeyDown handler, make typing in inputs
  // work as expected. For example, spacebar can be used
  // as normal characters instead of a shortcut.
  handleKeyDown = event => {
    if (event.target.nodeName === 'INPUT') {
      return;
    }
    this.props.provided.dragHandleProps.onKeyDown(event);
  }
  renderFields = () => (
    <div className="flex-1 ml-3">
      <div>
        <label className="py-2 inline-block" htmlFor={`${this.props.id}_alt`}>Alt text <small>(for SEO)</small></label>
      </div>
      <DebounceInput
        id={`${this.props.id}_alt`}
        value={this.props.alt}
        debounceTimeout={300}
        className="text-input"
        onMouseDown={e => e.stopPropagation()}
        onChange={this.handleAltChange} />
      <div>
        <label className="py-2 inline-block" htmlFor={`${this.props.id}_caption`}>Caption text</label>
      </div>
      <DebounceInput
        id={`${this.props.id}_caption`}
        value={this.props.caption}
        debounceTimeout={300}
        onMouseDown={e => e.stopPropagation()}
        className="text-input"
        onChange={this.handleCaptionChange} />
    </div>
  )
  getStyles = (provided, isDragging) => ({
    ...provided
  })
  render() {
    return (
      <div
        style={this.getStyles(this.props.provided.draggableStyle, this.props.snapshot.isDragging)}
        {...this.props.provided.dragHandleProps}
        onKeyDown={this.handleKeyDown}
      >
        <div className="flex pt-4">
          <div className="flex-1 text-center">
            <Image publicId={this.props.id} height="160">
            </Image>
          </div>
          {this.props.showFields ? this.renderFields() : null}
        </div>
      </div>
    )
  }
}

export default GalleryItem;
