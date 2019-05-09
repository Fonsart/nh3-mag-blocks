import blockArchiveImage from './blocks/photo-document';
import blockArchiveAudio from './blocks/audio-document';
import blockArchiveVideo from './blocks/video-document';
import blockFeaturedImageCaption from './blocks/featured-image-caption';

// Required components
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl, TextareaControl } = wp.components;

const NAMESPACE = 'nh3';

[
  { name: 'photo-document', definition: blockArchiveImage },
  { name: 'audio-document', definition: blockArchiveAudio },
  { name: 'video-document', definition: blockArchiveVideo },
  // { name: 'featured-image-caption', definition: blockFeaturedImageCaption },
].forEach(block => {
  registerBlockType(`${NAMESPACE}/${block.name}`, block.definition);
});

function replacePostFeaturedImage() {
  return function() {
    return (
      <div>
        <TextControl
          label={__('Photo Entry URL')}
          onChange={value => console.log(value)}
        />
        <TextareaControl
          label={__('Caption')}
          onChange={value => console.log(value)}
        />
      </div>
    )
  }
}

wp.hooks.addFilter(
  'editor.PostFeaturedImage',
  'my-plugin/replace-post-featured-image',
  replacePostFeaturedImage
);
