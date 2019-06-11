import { __ } from '@wordpress/i18n';
import capitalize from 'lodash.capitalize';
import { VideoPlayer } from '../components/video-player';
import { Caption } from '../components/caption';
import { Credit } from '../components/credit';
import { DocumentSelector } from '../components/document-selector';
import { VIDEO_TYPE } from '../models/resources';
import { fromAudioTo, fromPhotoTo, toAudio, toPhoto } from '../transforms';

export default {
  title: __('%s Document').replace('%s', capitalize(VIDEO_TYPE)), // "Video Document"
  icon: 'format-video',
  category: 'nh3-mag-blocks',
  transforms: {
    from: [fromAudioTo('video'), fromPhotoTo('video')],
    to: [toAudio, toPhoto]
  },
  supports: {
    customClassName: false
  },
  attributes: {
    // The video url
    fileUrl: { type: 'string' },
    // The video thumbnail url
    thumbnailUrl: { type: 'string' },
    // The video caption (input by the CMS user)
    caption: { type: 'string' },
    // The hash id of the document
    hash: { type: 'string' },
    // The video id
    id: { type: 'integer' },
    // The video MIME type
    mimeType: { type: 'string' },
    platform: { type: 'string' },
    credit: { type: 'string' }
  },

  /**
   * edit function
   * Generates the markup for the editor interface.
   * @param {Object} props Let's you bind markup and attributes as well as other controls
   * @param {Object} props.attributes An object containing the block's attributes
   * @param {Function} props.setAttributes A function to update the block's attributes
   * @return JSX ECMAScript Markup for the editor
   */
  edit({ attributes, setAttributes }) {
    /**
     * Filter the entry object received from the API
     */
    function processVideoEntry(entry) {
      return {
        id: entry.media.id,
        fileUrl: entry.media.file_url,
        thumbnailUrl: entry.cover_url || entry.media.thumbnail_url,
        mimeType: entry.media.mime_type
      };
    }

    /**
     * Reset the document attributes
     * Used when an error occurs with the provided link so that the state is clean.
     * Only the credit and caption attributes are kept (to avoid the user having to retype it if it made a mistake)
     */
    function resetVideoDocument() {
      setAttributes({
        id: undefined,
        fileUrl: undefined,
        thumbnailUrl: undefined,
        mimeType: undefined,
        hash: undefined,
        platform: undefined
      });
    }

    const videoJsOptions = {
      autoplay: false,
      controls: true,
      loadingSpinner: false,
      bigPlayButton: true,
      textTrackDisplay: false,
      errorDisplay: false,
      textTrackSettings: false,
      poster: attributes.thumbnailUrl,
      fluid: true,
      techOrder: ['html5'],
      preload: 'auto',
      sources: [
        {
          src: attributes.fileUrl,
          type: attributes.mimeType
        }
      ]
    };

    return (
      <DocumentSelector
        className={`nh3-mag-${VIDEO_TYPE}-document-edit`}
        type={VIDEO_TYPE}
        processor={processVideoEntry}
        setDocumentState={setAttributes}
        document={attributes}
        onError={resetVideoDocument}
      >
        {attributes.fileUrl && (
          <div data-vjs-player>
            <VideoPlayer {...videoJsOptions} />
            <Caption
              onChange={caption => setAttributes({ caption })}
              value={attributes.caption}
            />
            <Credit
              onChange={credit => setAttributes({ credit })}
              value={attributes.credit}
            />
          </div>
        )}
      </DocumentSelector>
    );
  },
  /**
   * Server-side rendered
   * @see {@link ../../templates/video-document.php}
   */
  save() {
    return null;
  }
};
