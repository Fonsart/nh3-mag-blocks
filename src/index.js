/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 * @see https://medium.com/@eudestwt/how-to-make-a-dynamic-wordpress-gutenberg-block-with-server-side-rending-3cb0dd6744ed
 */

import { getEntry } from './service/entries';
import { escapeRegExp } from './utils';

// Required components
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

const BASE_URL = "https://dev2.notrehistoire.ch/entries";

/**
 * Registers and creates block
 *
 * Compatible with Gutenberg 2.2.0+
 *
 * @param Name Name of the block with a required name space
 * @param ObjectArgs Block configuration {
 *      title - Title, displayed in the editor
 *      icon - Icon, from WP icons
 *      category - Block category, where the block will be added in the editor
 *      attributes - Object with all binding elements between the view HTML and the functions
 *      edit function - Returns the markup for the editor interface.
 *      save function - Returns the markup that will be rendered on the site page
 * }
 *
 */
registerBlockType('nh3/archive-image', {
  title: __('Dynamic Sum Block (Sample)'), // Title, displayed in the editor
  icon: 'universal-access-alt', // Icon, from WP icons
  category: 'common', // Block category, where the block will be added in the editor
  /**
   * Object with all binding elements between the view HTML and the functions
   * It lets you bind data from DOM elements and storage attributes
   */
  attributes: {
    id: {
      type: 'string'
    },
    path: {
      type: 'string'
    },
    hash: {
      type: 'string'
    },
    pageUrl: {
      type: 'string'
    },
    errorMessage: {
      type: 'string'
    },
    loading: {
      type: 'boolean'
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

    if (attributes.hash) {
      setAttributes({ documentUrl: `${BASE_URL}/${attributes.hash}` })
    }

    /**
     * Test that the user provided URL is valid, comparing it with the BASE_URL.
     * @param {String} url The string to test
     * @return {Boolean}
     */
    function validateUrl(url) {
      const format = new RegExp(`^${escapeRegExp(BASE_URL)}\/[a-zA-Z1-9]+$`);
      return format.test(url);
    }

    function onChangeDocumentUrl(newUrl) {
      setAttributes({ documentUrl: newUrl });
      if (newUrl && !validateUrl(newUrl)) {
        setAttributes({
          errorMessage: __('Invalid URL'),
          hash: null
        });
      } else {
        const hash = newUrl.split('/').pop();
        setAttributes({
          errorMessage: null,
          hash,
          loading: true
        });
        getEntry(hash).then(receivedEntry).catch(catchError);
      }
    }

    function receivedEntry(entry) {
      setAttributes({ loading: false });
      console.log(`Entry result for hash ${attributes.hash}`, entry);
      if (entry.data.length === 0) {
        setAttributes({ errorMessage: __('No existing document for this URL') })
      } else {

      }
    }

    function catchError(error) {
      console.log(`Entry error for hash ${attributes.hash}`, error);
      setAttributes({
        errorMessage: 'Error',
        loading: false
      });
    }

    return (
      <div id="block-dynamic-box"> {/* You have to have a wrapper tag when your markup has more than 1 tag */}
        {attributes.errorMessage && <p class="nh3-mag-archive-image-error-message">{attributes.errorMessage}</p>}
        {attributes.loading && <p class="nh3-mag-archive-image-loading">{__('Loading...')}</p>}
        <TextControl
          className={className} // Automatic class: gutenberg-blocks-sample-block-editable
          label={__('Input a complete ourHistory document page URL')}
          value={attributes.documentUrl}
          placeholder={`${BASE_URL}/[${__('hash_value')}]`}
          onChange={onChangeDocumentUrl}
        />
        {/* <PlainText
          className={className} // Automatic class: gutenberg-blocks-sample-block-editable
          onChange={onChangeUrl} // onChange event callback
          value={documentUrl} // Binding
          placeholder="Coller l'URL de la page contenant l'image à intégrer"
        /> */}
      </div>
    )
  },
  save() {
    return null
  },
});
