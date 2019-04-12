/**
 * Simple dynamic block sample
 *
 * Creates a block that doesn't render the save side, because it's rendered on PHP
 * @see https://medium.com/@eudestwt/how-to-make-a-dynamic-wordpress-gutenberg-block-with-server-side-rending-3cb0dd6744ed
 */

import { getEntry } from '../service/entries';

// Required components
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PlainText } = wp.editor;

const BASE_URL = "https://dev2.notrehistoire.ch/entries/";

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
    }
  },

  /**
   * edit function
   *
   * Makes the markup for the editor interface.
   *
   * @param object props Let's you bind markup and attributes as well as other controls
   *
   * @return JSX ECMAScript Markup for the editor
   */
  edit({ className, attributes, setAttributes }) {

    const url = attributes.hash ? `${BASE_URL}${attributes.hash}` : null

    function onChangeId(content) {
      setAttributes({ id: content })
    }

    function onChangePath(content) {
      setAttributes({ path: content })
    }

    async function onChangeUrl(newUrl) {
      const hash = newUrl.split('/').pop();
      setAttributes({ hash })
      const entry = await getEntry(hash)
      console.log(entry.data[0].media);
    }

    return (
      <div id="block-dynamic-box"> {/* You have to have a wrapper tag when your markup has more than 1 tag */}
        <label>Url:</label>
        <PlainText
          className={className} // Automatic class: gutenberg-blocks-sample-block-editable
          onChange={onChangeUrl} // onChange event callback
          value={url} // Binding
          placeholder="Coller l'URL de la page contenant l'image à intégrer"
        />
      </div>
    )
  },
  save(props) {
    return null // See PHP side. This block is rendered on PHP.
  }
});
