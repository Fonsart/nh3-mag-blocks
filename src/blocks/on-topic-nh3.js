import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
import debounce from 'lodash.debounce';
import { LinkCard } from '../components/link-card';
import { getEntryByHash } from '../service/entries';
import { fromUrl, parseUrl } from '../utils';
import { getGalleryBySlug } from '../service/galleries';

let dataCache;

export default {
  title: __('NH3 Links'),
  icon: 'admin-links',
  category: 'nh3-mag-blocks',
  parent: [ 'nh3/on-topic-section' ],
  supports: {
    multiple: false
  },
  attributes: {
    data:
      { type: 'string' }
  },
  edit({ className, attributes, setAttributes }) {
    console.log('edit triggered');

    const setData = dataObj => {
      console.log('serialization of dataObj', JSON.stringify(dataObj));
      setAttributes({ data: JSON.stringify(dataObj) })
    };
    // Initialize the data to an empty array to avoid a JSON parser error when no data
    const getData = () => attributes.data ? JSON.parse(attributes.data) : [];

    let dataObj = getData();
    dataCache = dataCache || getData();

    async function onLinkListChange(content) {
      console.log(content);
      content.split(/\n/).forEach(link => {
        const linkType = parseUrl(link);
        if (linkType.isMedia) {
          getEntryByHash(fromUrl(link))
            .then(media => dataObj.push(media))
            .then(() => setData(dataObj));
        } else if (linkType.isGallery) {
          getGalleryBySlug(fromUrl(link))
            .then(gallery => dataObj.push(gallery));
        } else {
          dataObj.push({
            error: __('Invalid URL')
          });
        }
      });
      // setData(dataObj);
    }

    console.log(dataObj)
    return (
      <div className={className}>
        <h3>{__('ourHistory')}</h3>
        <TextareaControl onChange={onLinkListChange} label={__('Paste one link per line')} />
        {dataObj.map(link => <LinkCard link={link} />)}
      </div>
    )
  },
  save() {
    return null;
  }
}
