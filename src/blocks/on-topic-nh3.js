import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';

import { LinkContent } from '../components/link-content';
import { uniqLink } from '../utils/misc';
import { AreaLabel } from '../components/area-label';
import { getLinkContentPromise } from '../utils/link-management';


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

    // Utility to set the component data serialization
    const setData = dataObj => setAttributes({ data: JSON.stringify(dataObj) });
    // Initialize the data to an empty array to avoid a JSON parser error when no data
    const getData = () => attributes.data ? JSON.parse(attributes.data) : [];

    let linksData = getData();

    if (!attributes.init) {
      // When init, rebuild the textarea content from the component's data
      setAttributes({
        linkString: linksData.map(link => link.url).join('\n'),
        init: true
      })
    }

    /**
     * When the content of the text area changes,
     * Tests each line of the content and fetch the corresponding resource if necessary.
     * Then, set the component's data with the resulting data structure.
     * @param {string} value Content of the textarea
     */
    async function onLinkStringChange(value) {
      const links = uniqLink(value.split(/\n/));
      setAttributes({ linkString: links.join('\n') });
      let apiResults = await Promise.all(links.filter(Boolean).map(getLinkContentPromise));
      setData(apiResults);
    }

    return (
      <div className={className}>
        <h3>{__('ourHistory')}</h3>
        <TextareaControl onChange={onLinkStringChange} label={<AreaLabel />} value={attributes.linkString} />
        {linksData.map(link => <LinkContent value={link} />)}
      </div>
    )
  },
  save() {
    return null;
  }
}
