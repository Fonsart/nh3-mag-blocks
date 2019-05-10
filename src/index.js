import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

import blockArchiveImage from './blocks/photo-document';
import blockArchiveAudio from './blocks/audio-document';
import blockArchiveVideo from './blocks/video-document';
import blockOnTopicSection from './blocks/on-topic-section';
import blockOnTopicNh3 from './blocks/on-topic-nh3';
import blockOnTopicRts from './blocks/on-topic-rts';

const NAMESPACE = 'nh3';

[
  { name: 'photo-document', definition: blockArchiveImage },
  { name: 'audio-document', definition: blockArchiveAudio },
  { name: 'video-document', definition: blockArchiveVideo },
  { name: 'on-topic-section', definition: blockOnTopicSection },
  { name: 'on-topic-nh3-links', definition: blockOnTopicNh3 },
  { name: 'on-topic-rts-links', definition: blockOnTopicRts },
].forEach(block => {
  registerBlockType(`${NAMESPACE}/${block.name}`, block.definition);
});

// WIP to replace the featured image default block
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
