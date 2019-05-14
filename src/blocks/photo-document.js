/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 * @see https://medium.com/@eudestwt/how-to-make-a-dynamic-wordpress-gutenberg-block-with-server-side-rending-3cb0dd6744ed
 */
import { __ } from '@wordpress/i18n';
import debounce from 'lodash.debounce';
import capitalize from 'lodash.capitalize';

import { getEntryByHash, getEntryByMediaId } from '../service/entries';
import { print } from '../utils/misc';
import { MEDIA_BASE_URL, isMediaUrl} from '../utils/link-management';
import { EditPhoto } from '../components/edit-photo';
import { Alert } from '../components/alert';
import { Spinner } from '../components/spinner';
import { UrlInput } from '../components/url-input';
import { fromAudioTo, fromVideoTo, toAudio, toVideo } from '../transforms';

const MEDIA_TYPE = 'photo';

export default {
  title: __(`${capitalize(MEDIA_TYPE)} Document`),
  icon: 'format-image',
  category: 'nh3-mag-blocks',
  transforms: {
    from: [ fromAudioTo('photo'), fromVideoTo('photo') ],
    to: [ toAudio, toVideo ]
  },
  supports: {
    customClassName: false
  },
  attributes: {
    id: // NH3 id of the photo
      { type: 'integer' },
    fileUrl: // Media thumbnail URL
      { type: 'string' },
    title: // Media title (if present)
      { type: 'string' },
    userName: // Media user name (if present)
      { type: 'string' },
    hash: // Hash of the NH3 entry that contains the photo
      { type: 'string' },
    caption: // Integrated photo caption. Written by the user and saved in the post data.
      { type: 'string' }
  },

  /**
   * edit function
   * Generates the markup for the editor interface.
   * @param {Object} props Let's you bind markup and attributes as well as other controls
   * @param {String} props.className The class name for the block
   * @param {Object} props.attributes An object containing the block's attributes
   * @param {Function} props.setAttributes A function to update the block's attributes
   * @return JSX ECMAScript Markup for the editor
   */
  edit({ className, attributes, setAttributes }) {

    const debouncedGetEntriesByHash = debounce(documentHash => {
      setAttributes({ loading: true });
      getEntryByHash(documentHash, 'photo')
        .then(receivedEntry)
        .catch(handleError)
    }, 250);

    /**
     * When initializing...
     * * See if an ID is present, in which case, refresh the data by requesting the entry that have this media ID
     * * See if a Hash is present, in which case, update the documentUrl to the supposed URL, and check that this URL points to an actual thing
     */
    if (!attributes.initialized) {
      if (attributes.id) {
        getEntryByMediaId(attributes.id, MEDIA_TYPE)
          .then(entry => {
            setAttributes({
              hash: entry.hash_id,
              documentUrl: `${MEDIA_BASE_URL}/${entry.hash_id}`
            });
            return entry;
          })
          .then(receivedEntry)
          .catch(handleError);
      } else if (attributes.hash) {
        onChangeDocumentUrl(`${MEDIA_BASE_URL}/${attributes.hash}`);
      }
      setAttributes({ initialized: true });
    }

    /**
     * Triggered each time the user modify the value of the document URL in the block.
     * Will check against the NH3 API if a entry exist that match the URL.
     * If so, the entry media is requested and the required information are save in the block attributes.
     * @param {String} documentUrl The user updated URL
     */
    function onChangeDocumentUrl(documentUrl) {
      resetMediaAttributes();
      setAttributes({ documentUrl });
      if (!documentUrl) {
        const errorMessage = __('Empty URL');
        setAttributes({ errorMessage, hash: null })
      } else if (documentUrl && !isMediaUrl(documentUrl)) {
        const errorMessage = __('Invalid URL');
        setAttributes({ errorMessage, hash: null });
      } else {
        const hash = documentUrl.split('/').pop();
        setAttributes({ errorMessage: null, hash });
        debouncedGetEntriesByHash(hash);
      }
    }

    /**
     * Triggered to handle NH3 API request result.
     * @param {Object} entry The API result object
     */
    function receivedEntry(entry) {
      print('Entry received:', entry);
      setAttributes({ loading: false });
      if (!entry) {
        setAttributes({ errorMessage: __(`No existing ${MEDIA_TYPE} document for this URL`) })
        resetMediaAttributes();
      } else {
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
     * @param {String} [entry.media.thumbnail_url] The media thumbnail URL
     * @param {Object} [entry.user] An entry's user object
     * @param {String} [entry.user.name] The entry's user name
     */
    function setMediaAttributes({ title, media, user } = {}) {
      const { id, thumbnail_url } = media || {};
      const { name, username } = user || {};
      setAttributes({
        id,
        title,
        userName: name || username,
        fileUrl: thumbnail_url
      });
    }

    /**
     * Triggered to handle API call errors.
     * @param {*} error Error raised while requesting the NH3 API
     */
    function handleError(error) {
      print(error);
      setAttributes({
        errorMessage: 'Error',
        loading: false
      });
    }

    return (
      <div class='nh3-mag-photo-document-edit'>
        <UrlInput className={attributes.errorMessage ? 'errored' : ''} entryType={MEDIA_TYPE} onChange={onChangeDocumentUrl} value={attributes.documentUrl} />
        {attributes.loading && <Spinner classes={MEDIA_TYPE} />}
        {attributes.errorMessage && <Alert content={attributes.errorMessage} />}
        {attributes.fileUrl && <EditPhoto onCaptionChange={caption => setAttributes({ caption })} {...attributes} />}
      </div>
    )
  },
  save() {
    return null
  },
}
