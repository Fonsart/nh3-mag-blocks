/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 * @see https://medium.com/@eudestwt/how-to-make-a-dynamic-wordpress-gutenberg-block-with-server-side-rending-3cb0dd6744ed
 */
import { __ } from '@wordpress/i18n';
import capitalize from 'lodash.capitalize';
import { Caption } from '../components/caption';
import { Credit } from '../components/credit';
import { DocumentSelector } from '../components/document-selector';
import { PHOTO_TYPE } from '../models/resources';
import { fromAudioTo, fromVideoTo, toAudio, toVideo } from '../transforms';


export default {
  title: __('%s Document').replace('%s', capitalize(PHOTO_TYPE)), // "Photo Document"
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
    hash: // Hash of the NH3 entry that contains the photo
      { type: 'string' },
    caption: // Integrated photo caption. Written by the user
      { type: 'string' },
    credit: // Integrated photo credit. Written by the user
      { type: 'string' },
    platform: // NH3 platform identifier
      { type: 'string' }
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

    function processPhotoEntry(entry) {
      return {
        id: entry.media.id,
        fileUrl: entry.media.thumbnail_url
      };
    }

    function resetPhotoDocument() {
      setAttributes({
        id: undefined,
        hash: undefined,
        fileUrl: undefined,
        platform: undefined
      });
    }

    return (
      <DocumentSelector
        className={`nh3-mag-${PHOTO_TYPE}-document-edit`}
        type={PHOTO_TYPE}
        processor={processPhotoEntry}
        setDocumentState={setAttributes}
        document={attributes}
        onError={resetPhotoDocument}>
        {attributes.fileUrl &&
          <div>
            <img src={attributes.fileUrl} />
            <Caption onChange={caption => setAttributes({ caption })} value={attributes.caption} />
            <Credit onChange={credit => setAttributes({ credit })} value={attributes.credit} />
          </div>
        }
      </DocumentSelector>
    )
  },
  /**
   * Server-side rendered
   * @see {@link ../../templates/photo-document.php}
   */
  save() {
    return null
  },
}
