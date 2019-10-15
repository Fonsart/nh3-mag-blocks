import { InnerBlocks } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { Alert } from '../components/alert';

/**
 * By default, no blocks are allowed inside this block.
 * Add this block's reference in the `parent` property array of another block
 * to enable it on this block.
 * ```
 *   parent: [ 'nh3/on-topic-section' ],
 * ```
 * @see https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/inner-blocks#allowedblocks
 */
const ALLOWED_BLOCKS = ['core/paragraph'];

/**
 * Block that can contain links blocks, such as NH3 Links or SSR Links.
 * Can only contains blocks that have been registered with this block as their parents.
 */
export default {
  title: __('"On Topic" Section'),
  icon: 'category',
  category: 'nh3-mag-blocks',
  supports: {
    multiple: false
  },
  edit({ className }) {
    return (
      <div className={className}>
        <h2>{__("On the same topic")}</h2>
        <Alert type='info' content={__("This block should be placed at the very end of your post")} />
        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} renderAppender={() => <OnTopicAppender />} />
      </div>
    );
  },
  /**
   * This function returns the content of the inner blocks,
   * but the main block is still rendered on the server side.
   * The inner block content is available to the server-side render function in the $content argument.
   * It contains the rendered inner blocks (which can also be server-rendered).
   * @see {@link ../../templates/on-topic-section.php}
   */
  save() {
    return <InnerBlocks.Content />;
  }
}
