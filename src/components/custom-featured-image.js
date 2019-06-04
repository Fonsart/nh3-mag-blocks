import { __ } from '@wordpress/i18n';
import { DocumentSelector } from './document-selector';
import { Caption } from './caption';
import { Credit } from './credit';
import { Component } from '@wordpress/element/build/react';
import { PHOTO_TYPE } from '../models/resources';
import { calculateDimensions } from '../utils/misc';

/**
 * Component used in a post sidebar that replace the default Featured Image block
 */
export class CustomFeaturedImage extends Component {

  /**
   * Construct a new component
   * @param {Object} props The component's properties
   * @param {string} props.hash The document's hash
   * @param {string} props.platform The document's platform
   * @param {string} props.fileUrl The document's file URL
   * @param {string} props.width The document's file width
   * @param {string} props.height The document's file height
   * @param {string} props.title The document's file title
   * @param {string} props.caption The document's caption
   * @param {string} props.credit The document's credit
   */
  constructor(props) {
    super(props);

    this.state = {
      hash: props.hash,
      platform: props.platform,
      fileUrl: props.fileUrl,
      width: props.width,
      height: props.height,
      title: props.title,
      caption: props.caption,
      credit: props.credit
    }
  }

  /**
   * When receiving new props, update the state accordingly.
   * The newProps properties should be the same as documented in the constructor.
   * @see CustomFeaturedImage#constructor
   * @param {Object} newProps The new properties
   */
  componentWillReceiveProps({ hash, platform, fileUrl, width, height, title, caption, credit }) {
    this.setState({ hash, platform, fileUrl, width, height, title, caption, credit });
  }

  /**
   * Map the necessery properties out of a given entry object.
   * @param {Object} entry An API entry object
   */
  processEntry(entry) {
    const dim = calculateDimensions(entry.media.width, entry.media.height);
    return {
      fileUrl: entry.media.thumbnail_url,
      title: entry.title,
      ...dim
    };
  }

  /**
   * Update the component's state with the given document object.
   * Then update the post meta value.
   * @param {Object} props Document object
   */
  updateState({ hash, fileUrl, width, height, title, platform }) {
    this.setState(
      { hash, fileUrl, width, height, title, platform },
      () => this.props.setMeta(this.state)
    );
  }

  /**
   * If an error occurs, reset the component state and the post meta value.
   */
  handleError() {
    this.setState(
      {
        hash: null,
        platform: null,
        fileUrl: null,
        width: null,
        height: null,
        title: null,
        caption: null,
        credit: null
      },
      () => this.props.setMeta(this.state)
    );
  }

  /**
   * Update the caption in the document's state and the post meta value.
   * @param {string} caption The new caption
   */
  setCaption(caption) {
    this.setState(
      { caption },
      () => this.props.setMeta(this.state)
    );
  }

  /**
   * Update the credit in the document's state and the post meta value.
   * @param {string} credit The new credit
   */
  setCredit(credit) {
    this.setState(
      { credit },
      () => this.props.setMeta(this.state)
    );
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div class="nh3-mag-custom-featured-image">
        <DocumentSelector
          type={PHOTO_TYPE}
          processor={entry => this.processEntry(entry)}
          setDocumentState={changes => this.updateState(changes)}
          document={this.state}
          onError={() => this.handleError()}>
          {this.state.fileUrl &&
            <div>
              <img src={this.state.fileUrl} />
              <Caption onChange={caption => this.setCaption(caption)} value={this.state.caption} />
              <Credit onChange={credit => this.setCredit(credit)} value={this.state.credit} />
            </div>
          }
        </DocumentSelector>
      </div >
    )
  }

}
