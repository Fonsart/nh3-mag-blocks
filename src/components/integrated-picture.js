const { __ } = wp.i18n;
const { TextControl } = wp.components;

/**
 * Component that displays an image and its caption.
 * @param {Object} props The properties of the IntegratedPicture
 * @param {String} props.src The source for the image
 * @param {Function} props.onCaptionChange The callback that will be called each time the caption is updated.
 * @param {String} [props.caption] The caption to display below the image. Defaults to empty string
 */
export function IntegratedPicture({ src, onCaptionChange, caption = '', ...otherProps }) {
  return (
    <div class='nh3-mag-integrated-picture'>
      <figure class='nh3-mag-integrated-picture-figure'>
        <img src={src} {...otherProps} />
      </figure>
      <figcaption class='nh3-mag-integrated-picture-caption'>
        <TextControl onChange={onCaptionChange} placeholder={__('Write a caption for this picture')} value={caption} />
      </figcaption>
    </div>
  )
}
