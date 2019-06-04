import { registerBlockType } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import blockArchiveAudio from './blocks/audio-document';
import blockOnTopicNh3 from './blocks/on-topic-nh3';
import blockOnTopicSection from './blocks/on-topic-section';
import blockOnTopicSsr from './blocks/on-topic-ssr';
import blockArchiveImage from './blocks/photo-document';
import blockArchiveVideo from './blocks/video-document';
import { CustomFeaturedImage } from './components/custom-featured-image';

// Global namespace for all the registered blocks
const NAMESPACE = 'nh3';

/**
 * Register the blocks
 * To register a new block, add a new item to this array with the following properties:
 * * `name` - The name of the new block, without the namespace. It will be registered under the global nh3 namespace
 * * `definition` - An block registration object, as defined in the WordPress documentation {@link https://developer.wordpress.org/block-editor/developers/block-api/block-registration/}
 */
[
  { name: 'photo-document', definition: blockArchiveImage },
  { name: 'audio-document', definition: blockArchiveAudio },
  { name: 'video-document', definition: blockArchiveVideo },
  { name: 'on-topic-section', definition: blockOnTopicSection },
  { name: 'on-topic-nh3-links', definition: blockOnTopicNh3 },
  { name: 'on-topic-ssr-links', definition: blockOnTopicSsr },
].forEach(block => {
  registerBlockType(`${NAMESPACE}/${block.name}`, block.definition);
});

/**
 * Compose a FeaturedImage component
 * @see {@link ./components/custom-featured-image.js}
 */
const FeaturedImage = compose(
  withSelect((select, props) => {
    // Get the featured image JSON data (if it exists) from the database
    const meta = select('core/editor').getEditedPostAttribute('meta')[ props.metaFieldName ];
    const data = meta ? JSON.parse(meta) : {};
    return {
      hash: data.hash,
      platform: data.platform,
      fileUrl: data.fileUrl,
      width: data.width,
      height: data.height,
      title: data.title,
      caption: data.caption,
      credit: data.credit
    };
  }),
  withDispatch((dispatch, props) => {
    return {
      /**
       * Update the post meta by serializing the featured image properties into a JSON object.
       * @param {Object} metaProps The post's featured image properties
       */
      setMeta: function(metaProps) {
        const metaObj = { meta: { [ props.metaFieldName ]: JSON.stringify(metaProps) } };
        dispatch('core/editor').editPost(metaObj);
      }
    }
  })
)(CustomFeaturedImage);

/**
 * Called in the below filter to replace the default FeaturedImage block
 */
function replacePostFeaturedImage() {
  return () => <FeaturedImage metaFieldName="nh3_mag_custom_featured_image_field" />;
}

/**
 * Replace the native Featured Image with the custom featured image component
 */
wp.hooks.addFilter(
  'editor.PostFeaturedImage',
  'my-plugin/replace-post-featured-image',
  replacePostFeaturedImage
);
