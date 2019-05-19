import { __ } from '@wordpress/i18n';
import capitalize from 'lodash.capitalize';
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
    from: [ fromAudioTo('video'), fromPhotoTo('video') ],
    to: [ toAudio, toPhoto ]
  },
  supports: {
    customClassName: false
  },
  attributes: {
    fileUrl: // The video url
      { type: 'string' },
    thumbnailUrl: // The video thumbnail url
      { type: 'string' },
    caption: // The video caption (input by the CMS user)
      { type: 'string' },
    hash: // The hash id of the document
      { type: 'string' },
    id: // The video id
      { type: 'integer' },
    mimeType: // The video MIME type
      { type: 'string' },
    platform:
      { type: 'string' },
    credit:
      { type: 'string'}
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

    function processVideoEntry(entry) {
      return {
        id: entry.media.id,
        fileUrl: entry.media.file_url,
        thumbnailUrl: entry.cover_url || entry.media.thumbnail_url,
        mimeType: entry.media.mime_type
      }
    }

    function resetAudioDocument() {
      setAttributes({
        id: undefined,
        fileUrl: undefined,
        thumbnailUrl: undefined,
        mimeType: undefined,
        hash: undefined,
        platform: undefined
      })
    }

    return (
      <DocumentSelector
        className={`nh3-mag-${VIDEO_TYPE}-document-edit`}
        type={VIDEO_TYPE}
        processor={processVideoEntry}
        setDocumentState={setAttributes}
        document={attributes}
        onError={resetAudioDocument}>
        {attributes.fileUrl &&
          <div>
            <video controls poster={attributes.thumbnailUrl} onerror={error => console.log('video', error)}>
              <source src={attributes.fileUrl} type={attributes.mimeType} />
              Your browser does not support the <code>video</code> element.
            </video>
            <Caption onChange={caption => setAttributes({ caption })} value={attributes.caption} />
            <Credit onChange={credit => setAttributes({ credit })} value={attributes.credit} />
          </div>
        }
      </DocumentSelector>
    )
  },
  save() {
    return null;
  }
}
