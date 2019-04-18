/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 * @see https://medium.com/@eudestwt/how-to-make-a-dynamic-wordpress-gutenberg-block-with-server-side-rending-3cb0dd6744ed
 */
import * as debounce from 'lodash.debounce';

import { getEntriesByHash, getEntriesByMediaId } from '../service/entries';
import { BASE_URL, validateEntryUrl } from '../utils';
import { IntegratedPhoto } from '../components/integrated-photo';
import { Alert } from '../components/alert';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

const ctx = {
  initialized: false
}

export default {
  title: __('Photo NH3'), // Title, displayed in the editor
  icon: 'format-image', // Icon, from WP icons
  category: 'nh3-mag-blocks', // Block category, where the block will be added in the editor
  /**
   * Object with all binding elements between the view HTML and the functions
   * It lets you bind data from DOM elements and storage attributes
   */
  attributes: {
    // NH3 ID of the photo
    photo_id: {
      type: 'integer'
    },
    // AWS path for generating photo URL
    photo_path: {
      type: 'string'
    },
    // Media thumbnail URL
    photo_thumbnail_url: {
      type: 'string'
    },
    // Media title (if present)
    photo_title: {
      type: 'string'
    },
    // Media author name (if present)
    photo_author: {
      type: 'string'
    },
    // Hash of the NH3 entry that contains the photo
    document_hash: {
      type: 'string'
    },
    // Integrated photo caption. Written by the user and saved in the post data.
    photo_caption: {
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
    let alert;

    const debouncedGetEntriesByHash = debounce(documentHash => {
      setAttributes({ loading: true });
      getEntriesByHash(documentHash)
        .then(receivedEntries)
        .catch(catchError)
    }, 250);

    /**
     * When initializing...
     * * See if an ID is present, in which case, refresh the data by requesting the entry that have this media ID
     * * See if a Hash is present, in which case, update the documentUrl to the supposed URL, and check that this URL points to an actual thing
     */

    if (!ctx.initialized) {
      if (attributes.photo_id) {
        getEntriesByMediaId(attributes.photo_id)
          .then(result => {
            const documentHash = result.data[ 0 ].hash_id;
            attributes.document_hash !== documentHash && setAttributes({ document_hash: documentHash });
          })
          .catch(error => console.log(error));
      }
      if (attributes.document_hash) {
        const documentUrl = `${BASE_URL}/${attributes.document_hash}`;
        setAttributes({ documentUrl });
        onChangeDocumentUrl(documentUrl);
      }
      ctx.initialized = true;
    }

    /**
     * Triggered each time the user modify the value of the document URL in the block.
     * Will check against the NH3 API if a entry exist that match the URL.
     * If so, the entry media is requested and the required information are save in the block attributes.
     * @param {String} newUrl The user updated URL
     */
    function onChangeDocumentUrl(newUrl) {
      resetMediaAttributes();
      setAttributes({ documentUrl: newUrl });
      if (!newUrl) {
        setAttributes({
          errorMessage: __('Empty URL'),
          document_hash: null
        })
      } else if (newUrl && !validateEntryUrl(newUrl)) {
        setAttributes({
          errorMessage: __('Invalid URL'),
          document_hash: null
        });
      } else {
        const documentHash = newUrl.split('/').pop();
        setAttributes({
          errorMessage: null,
          document_hash: documentHash
        });
        debouncedGetEntriesByHash(documentHash);
      }
    }

    /**
     * Callback to pass to IntegratedPicture component so that it can
     * update the photo caption.
     * @param {String} caption The new photo caption.
     */
    function onChangePictureLegend(caption) {
      setAttributes({ photo_caption: caption });
    }

    /**
     * Triggered to handle NH3 API request result.
     * @param {Object} entries The API result object
     */
    function receivedEntries(entries) {
      console.log('Entries received:', entries);
      setAttributes({ loading: false });
      const entry = entries.data.length === 0 ? null : entries.data[ 0 ];
      if (!entry) {
        setAttributes({ errorMessage: __('No existing document for this URL') })
        resetMediaAttributes();
      } else if (entry.media_type !== 'photo') {
        setAttributes({ errorMessage: __('The provided URL does not contain a photo document') })
        resetMediaAttributes();
      } else {
        console.log(entry);
        setMediaAttributes(entry);
        setAttributes({ errorMessage: null });
      }
    }

    /**
     * Reset all photo related attributes.
     * This could be useful when en error occurs and the current photo should not be previews anymore.
     */
    function resetMediaAttributes() {
      setMediaAttributes();
    }

    /**
     * Set media related attributes based on the given entry object.
     * Note that if `entry` or `entry.media` is null, the media attributes will be unset,
     * meaning this method could also be called to reset the media state.
     * @param {Object} entry An entry object as returned by the NH3 API
     * @param {String} [entry.title] The entry title
     * @param {Object} [entry.media] An entry's media object
     * @param {Number} [entry.media.id] The media ID
     * @param {String} [entry.media.path] The media path
     * @param {String} [entry.media.thumbnail_url] The media thumbnail URL
     * @param {Object} [entry.user] An entry's user object
     * @param {String} [entry.user.name] The entry's user name
     */
    function setMediaAttributes({ title, media, user } = {}) {
      const { id, path, thumbnail_url } = media || {};
      const { name: userName } = user || {};
      setAttributes({
        photo_id: id || null,
        photo_path: path || null,
        photo_thumbnail_url: thumbnail_url || null,
        photo_title: title || null,
        photo_author: userName || null,
        photo_caption: null
      });
    }

    /**
     * Triggered to handle API call errors.
     * @param {*} error Error raised while requesting the NH3 API
     */
    function catchError(error) {
      console.log(error);
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
          className="nh3-mag-archive-photo-url-input"
          label={__('Document URL')}
          value={attributes.documentUrl}
          placeholder={`${BASE_URL}/[${__('hash_value')}]`}
          onChange={onChangeDocumentUrl}
          disabled={attributes.loading}
        />
        {alert}
        {attributes.photo_thumbnail_url &&
          <IntegratedPhoto
            caption={attributes.photo_caption}
            src={attributes.photo_thumbnail_url}
            onCaptionChange={onChangePictureLegend}
            photoTitle={attributes.photo_title || __('Untitled')}
            author={attributes.photo_author}
          />
        }
      </div>
    )
  },
  save() {
    return null
  },
}
