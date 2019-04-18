const { __ } = wp.i18n;
const { TextControl } = wp.components;

/**
 * Component that displays an image and its caption.
 * @param {Object} props The properties of the IntegratedPicture
 * @param {String} props.src The source for the image
 * @param {Function} props.onCaptionChange The callback that will be called each time the caption is updated.
 * @param {String} props.author The name of the user that published the photo
 * @param {String} props.photoTitle The title of the photo
 * @param {String} [props.caption] The caption to display below the image. Defaults to empty string
 */
export function IntegratedPhoto({ src, onCaptionChange, photoTitle, author, caption = '', ...otherProps }) {
  photoTitle = photoTitle ? `"${photoTitle}", ` : '';
  return (
    <div class='nh3-mag-integrated-photo'>
      <figure class='nh3-mag-integrated-photo-figure'>
        <img src={src} {...otherProps} />
        <p class='nh3-mag-integrated-photo-credits'>
          {`${photoTitle}${__('published by')} ${author}`}
        </p>
      </figure>
      <figcaption class='nh3-mag-integrated-photo-caption'>
        <TextControl onChange={onCaptionChange} placeholder={__('Write a caption for this photo')} value={caption} />
      </figcaption>
    </div>
  )
}
