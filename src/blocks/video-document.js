import debounce from 'lodash.debounce';
import capitalize from 'lodash.capitalize';

import { getEntryByHash, getEntryByMediaId } from '../service/entries';
import { BASE_URL, validateEntryUrl, print } from '../utils';
import { EditVideo } from '../components/edit-video';
import { Spinner } from '../components/spinner';
import { Alert } from '../components/alert';
import { UrlInput } from '../components/url-input';
import { fromAudioTo, toAudio, fromPhotoTo, toPhoto } from '../transforms';

const { __ } = wp.i18n;

const MEDIA_TYPE = 'video';

export default {
  title: __(`${capitalize(MEDIA_TYPE)} Document`),
  icon: 'format-video',
  category: 'nh3-mag-blocks',
  transforms: {
    from: [ fromAudioTo('video'), fromPhotoTo('video') ],
    to: [ toAudio, toPhoto ]
  },
  attributes: {
    userName: // The NH3 user that posted this video
      { type: 'string' },
    fileUrl: // The video url
      { type: 'string' },
    thumbnailUrl: // The video thumbnail url
      { type: 'string' },
    title: // The video title (if any)
      { type: 'string' },
    caption: // The video caption (input by the CMS user)
      { type: 'string' },
    hash: // The hash id of the document
      { type: 'string' },
    id: // The video id
      { type: 'integer' }
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
      getEntryByHash(documentHash, MEDIA_TYPE)
        .then(receivedEntry)
        .catch(handleError)
    }, 250);

    /**
     * When initializing...
     * * Check if there is an id attribute then load the entry based on this media attribute and update the component's state
     * * If no ID, check if there is a document Hash, and set the document URL according to this hash
     */
    if (!attributes.initialized) {
      if (attributes.id) {
        getEntryByMediaId(attributes.id, MEDIA_TYPE)
          .then(entry => {
            entry && setAttributes({
              hash: entry.hash_id,
              documentUrl: `${BASE_URL}/${entry.hash_id}`
            });
            return entry;
          })
          .then(receivedEntry)
          .catch(handleError);
      } else if (attributes.hash) {
        onChangeDocumentUrl(`${BASE_URL}/${attributes.hash}`);
      }
      setAttributes({ initialized: true });
    }

    /**
     * Triggered when the user changes the value of the Url Input component
     * The URL is tested and if valid, the entry is fetched from the API
     * and the component's state is updated accordingly
     * @param {string} documentUrl The new document URL
     */
    function onChangeDocumentUrl(documentUrl) {
      setAttributes({ documentUrl });
      resetMediaAttributes();
      if (!documentUrl) {
        const errorMessage = __('Empty URL');
        setAttributes({ errorMessage, hash: null })
      } else if (documentUrl && !validateEntryUrl(documentUrl, 'media')) {
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
     * Reset all audio related attributes.
     * This could be useful when en error occurs and the current audio should not be previewed anymore.
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
     * @param {String} [entry.media.file_url] The media file_url
     * @param {Object} [entry.user] An entry's user object
     * @param {String} [entry.user.name] The entry's user name
     */
    function setMediaAttributes({ title, media, user } = {}) {
      const { id, file_url, thumbnail_url } = media || {};
      const { name, username } = user || {};
      setAttributes({
        id,
        fileUrl: file_url,
        userName: name || username,
        title: title,
        thumbnailUrl: thumbnail_url
      });
    }

    /**
     * Triggered to handle API call errors.
     * @param {*} error Error raised while requesting the NH3 API
     */
    function handleError(error) {
      print(error);
      setAttributes({
        errorMessage: 'Unknown Error',
        loading: false
      });
    }

    return (
      <div id="block-dynamic-box" class={className}>
        <UrlInput onChange={onChangeDocumentUrl} entryType={MEDIA_TYPE} value={attributes.documentUrl} />
        {attributes.loading && <Spinner classes={MEDIA_TYPE} />}
        {attributes.errorMessage && <Alert content={attributes.errorMessage} />}
        {attributes.fileUrl && <EditVideo onCaptionChange={(caption) => setAttributes({ caption })} {...attributes} />}
      </div>
    )
  },
  save() {
    return null;
  }
}
