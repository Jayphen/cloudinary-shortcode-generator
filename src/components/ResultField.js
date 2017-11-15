import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const getItemShortcode = (data) => (
  data.map((item) => (`
    "${item.height},
    ${item.width},
    https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload/v${item.version}/${item.public_id}.${item.format},
    '${item.alt || 'null'}',
    "${item.caption || 'null'}'
    "
  `.replace(/\s+/g, ' ')))
)

export default class ResultField extends Component {
  static propTypes = {
    galleryTitle: PropTypes.string.isRequired,
    galleryType: PropTypes.string.isRequired,
    galleryItems: PropTypes.array.isRequired
  }
  state = {
    copied: false
  }

  template = () => (`
    {{ gallery "${this.props.galleryTitle}" "${this.props.galleryType}" ${getItemShortcode(this.props.galleryItems)} }}
  `.replace(/\s+/g, ' '));

  componentWillUpdate(prevProps, prevState) {
    if (prevState.copied === true) {
      window.setTimeout(() => {
        this.setState({copied: false})},
        1000
      );
    }
  }

  render() {
    return (
      <div className="mt-8">
        <h3 className="mb-2">
          Your shortcode
          <CopyToClipboard
            text={this.props.galleryItems.length === 0 ? 'Upload some images first pls' : this.template()}
            onCopy={() => this.setState({ copied: true })}
          >
            <span className="ml-3 underline text-xs cursor-pointer hover:text-purple">Copy to clipboard</span>
          </CopyToClipboard>
          {this.state.copied ? <span className="text-red ml-3 text-xs">Copied!</span> : null}
        </h3>
        <textarea
          disabled={this.props.galleryItems.length === 0}
          value={this.props.galleryItems.length === 0 ? 'Upload some images first pls' : this.template()}
          className="block min-h-8 w-full g-white border border-grey-light hover:border-grey px-3 py-2 rounded shadow"
        />
      </div>
    )
  }
}
