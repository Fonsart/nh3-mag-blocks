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

const NAMESPACE = 'nh3';

/**
 * Register the blocks
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
 */
const FeaturedImage = compose(
  withSelect((select, props) => {
    const data = JSON.parse(select('core/editor').getEditedPostAttribute('meta')[ props.metaFieldName ]);
    console.log('FeaturedImage.withSelect', data, props);
    return data;
  }),
  withDispatch((dispatch, props) => {
    return {
      setMeta: function(metaProps) {
        const metaObj = { meta: { [ props.metaFieldName ]: JSON.stringify(metaProps) } };
        console.log('FeaturedImage.setMeta', metaObj, props);
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

wp.hooks.addFilter(
  'editor.PostFeaturedImage',
  'my-plugin/replace-post-featured-image',
  replacePostFeaturedImage
);
