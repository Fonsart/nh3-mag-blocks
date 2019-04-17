/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 * @see https://medium.com/@eudestwt/how-to-make-a-dynamic-wordpress-gutenberg-block-with-server-side-rending-3cb0dd6744ed
 */
import * as debounce from 'lodash.debounce';

import { getEntriesByHash, getEntriesByMediaId } from '../service/entries';
import { BASE_URL, validateEntryUrl } from '../utils';
import { IntegratedPicture } from '../components/integrated-picture';
import { Alert } from '../components/alert';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

const ctx = {
  initialized: false
}

export default {
  title: __('Archive Image'), // Title, displayed in the editor
  icon: 'format-image', // Icon, from WP icons
  category: 'nh3-mag-blocks', // Block category, where the block will be added in the editor
  /**
   * Object with all binding elements between the view HTML and the functions
   * It lets you bind data from DOM elements and storage attributes
   */
  attributes: {
    // NH3 ID of the media
    mediaId: {
      type: 'integer'
    },
    // AWS path for generating media URL
    mediaPath: {
      type: 'string'
    },
    // Media thumbnail URL
    mediaThumbnailURL: {
      type: 'string'
    },
    // Hash of the NH3 entry that contains the media
    documentHash: {
      type: 'string'
    },
    // Integrated media caption. Written by the user and saved in the post data.
    caption: {
      type: 'string'
    }
  },

  /**
   * edit function
   * Makes the markup for the editor interface.
   * @param object props Let's you bind markup and attributes as well as other controls
   * @return JSX ECMAScript Markup for the editor
   */
  edit({ className, attributes, setAttributes }) {
    console.log('Triggering Edit method', attributes);
    let alert;

    /**
     * When initializing...
     * * See if an ID is present, in which case, refresh the data by requesting the entry that have this media ID (and include the media also)
     * * See if a Hash is present, in which case, update the documentUrl to the supposed URL, and check that this URL points to an actual thing
     */

    if (!ctx.initialized) {
      if (attributes.mediaId) {
        getEntriesByMediaId(attributes.mediaId)
          .then(result => console.log(`Entries result for media ID ${attributes.mediaId}`, result))
          .catch(error => console.log(error));
      }
      ctx.initialized = true;
    }

    if (attributes.documentHash) {
      setAttributes({ documentUrl: `${BASE_URL}/${attributes.documentHash}` })
    }

    /**
     * Triggered each time the user modify the value of the document URL in the block.
     * Will check against the NH3 API if a entry exist that match the URL.
     * If so, the entry media is requested and the required information are save in the block attributes.
     * @param {String} newUrl The user updated URL
     */
    function onChangeDocumentUrl(newUrl) {
      console.log('New url', newUrl);
      setAttributes({ documentUrl: newUrl });
      if (!newUrl) {
        setAttributes({
          errorMessage: __('Empty URL'),
          documentHash: null
        })
      } else if (newUrl && !validateEntryUrl(newUrl)) {
        setAttributes({
          errorMessage: __('Invalid URL'),
          documentHash: null
        });
        resetMediaAttributes();
      } else {
        const documentHash = newUrl.split('/').pop();
        setAttributes({
          errorMessage: null,
          documentHash
        });
        debouncedGetEntriesByHash(documentHash);
      }
    }

    const debouncedGetEntriesByHash = debounce(documentHash => {
      setAttributes({ loading: true });
      getEntriesByHash(documentHash)
        .then(receivedEntries)
        .catch(catchError)
    }, 250);

    /**
     * Callback to pass to IntegratedPicture component so that it can
     * update the image caption.
     * @param {String} caption The new image caption.
     */
    function onChangePictureLegend(caption) {
      setAttributes({ caption });
    }

    /**
     * Triggered to handle NH3 API request result.
     * @param {Object} entries The API result object
     */
    function receivedEntries(entries) {
      setAttributes({ loading: false });
      const entry = entries.data.length === 0 ? null : entries.data[ 0 ];
      if (!entry) {
        setAttributes({ errorMessage: __('No existing document for this URL') })
        resetMediaAttributes();
      } else if (entry.media_type !== 'photo') {
        setAttributes({ errorMessage: __('The provided URL does not contain a photo document') })
        resetMediaAttributes();
      } else {
        console.log(`Entry result for hash ${attributes.documentHash}`, entry);
        setAttributes({
          mediaId: Number(entry.media.id),
          mediaPath: entry.media.path,
          mediaThumbnailURL: entry.media.thumbnail_url,
          errorMessage: null
        });
      }
    }

    /**
     * Reset all media related attributes.
     * This could be useful when en error occurs and the current media should not be previews anymore.
     */
    function resetMediaAttributes() {
      setAttributes({
        mediaId: null,
        mediaPath: null,
        mediaThumbnailURL: null,
        caption: null
      });
    }

    /**
     * Triggered to handle API call errors.
     * @param {*} error Error raised while requesting the NH3 API
     */
    function catchError(error) {
      console.log(`Entry error for hash ${attributes.documentHash}`, error);
      setAttributes({
        errorMessage: 'Error',
        loading: false
      });
    }

    if (attributes.errorMessage) {
      alert = <Alert content={attributes.errorMessage} type='error' />
    } else if (attributes.loading) {
      alert = <Alert type='loading' />
    } else {
      alert = null;
    }

    return (
      <div id="block-dynamic-box" class={className}>
        <TextControl
          className="nh3-mag-archive-image-url-input"
          label={__('Document URL')}
          value={attributes.documentUrl}
          placeholder={`${BASE_URL}/[${__('hash_value')}]`}
          onChange={onChangeDocumentUrl}
          disabled={attributes.loading}
        />
        {alert}
        {attributes.mediaThumbnailURL && <IntegratedPicture caption={attributes.caption} src={attributes.mediaThumbnailURL} onCaptionChange={onChangePictureLegend} />}
      </div>
    )
  },
  save() {
    return null
  },
}
