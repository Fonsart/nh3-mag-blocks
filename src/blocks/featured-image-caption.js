const { __ } = wp.i18n;
const { TextControl } = wp.components;

export default {
  title: __('Featured Image Caption'),
  icon: 'format-quote',
  category: 'nh3-mag-utils',
  supports: {
    multiple: null
  },
  attributes: {
    caption: {
      type: 'string',
      source: 'text',
      selector: 'p.nh3-mag-featured-image-caption'
    }
  },
  edit({ attributes, setAttributes }) {
    return <TextControl
      class='nh3-mag-featured-image-caption'
      onChange={(caption => setAttributes({ caption }))}
      value={attributes.caption}
      placeholder={__("Write a caption for this post's featured image")}
    />;
  },
  save({ caption }) {
    if (caption) {
      return <p class="nh3-mag-featured-image-caption">{caption}</p>;
    } else {
      return null;
    }
  }
}
