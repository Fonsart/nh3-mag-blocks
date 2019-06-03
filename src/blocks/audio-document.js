import { __ } from '@wordpress/i18n';
import capitalize from 'lodash.capitalize';
import { Caption } from '../components/caption';
import { Credit } from '../components/credit';
import { DocumentSelector } from '../components/document-selector';
import { AUDIO_TYPE } from '../models/resources';

export default {
  title: __('%s Document').replace('%s', capitalize(AUDIO_TYPE)), // "Audio Document"
  icon: 'format-audio',
  category: 'nh3-mag-blocks',
  supports: {
    customClassName: false
  },
  attributes: {
    fileUrl:
      { type: 'string' },
    caption:
      { type: 'string' },
    hash:
      { type: 'string' },
    id:
      { type: 'integer' },
    platform:
      { type: 'string' },
    credit:
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

    function processAudioEntry(entry) {
      return {
        id: entry.media.id,
        fileUrl: entry.media.file_url
      }
    }

    function resetAudioDocument() {
      setAttributes({
        id: undefined,
        hash: undefined,
        fileUrl: undefined,
        platform: undefined
      });
    }

    return (
      <DocumentSelector
        className={`nh3-mag-${AUDIO_TYPE}-document-edit`}
        type={AUDIO_TYPE}
        processor={processAudioEntry}
        setDocumentState={setAttributes}
        document={attributes}
        onError={resetAudioDocument}>
        {attributes.fileUrl &&
          <div>
            <audio controls src={attributes.fileUrl}>
              Your browser does not support the <code>audio</code> element.
            </audio>
            <Caption onChange={caption => setAttributes({ caption })} value={attributes.caption} />
            <Credit onChange={credit => setAttributes({ credit })} value={attributes.credit} />
          </div>
        }
      </DocumentSelector>
    )
  },
  /**
   * Server-side rendered
   * @see {@link ../../templates/audio-document.php}
   */
  save() {
    return null;
  }
}
