import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TYPES = [
  '1x1',
  '2x2',
  '3x3',
  'alternating',
  'portrait',
  '1 portrait 2 landscape'
]

const getTypes = () => {
  return TYPES.map((type, index) => (
    <option key={`${type}_${index}`} value={type.replace(/ /g,"-")}>{type}</option>
  ))
};

const getTypeWarning = () => (
  //Portrait and 1 portrait 2 landscape both will only
  //work with 1 portrait image due to CSS Grid quirks
  <div className="mt-3 text-xs text-red">Make sure you only use 1 portrait image for this gallery type, otherwise the second one will not display!</div>
)

export default class GalleryType extends Component {
  static propTypes = {
    galleryType: PropTypes.string.isRequired,
    handleTypeChange: PropTypes.func.isRequired
  }

  handleTypeChange = (e) => {
    this.props.handleTypeChange(e.target.value);
  }

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
            {getTypes()}
          </select>
          <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-slate">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        {this.props.galleryType.indexOf('portrait') !== -1 ? getTypeWarning() : ''}
      </div>
    )
  }
}

