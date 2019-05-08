import { Credit } from './credit';
import { Caption } from './caption';

/**
 * Component that displays an image and its caption.
 * @param {Object} props The properties of the IntegratedPicture
 * @param {String} props.fileUrl The source for the image
 * @param {Function} props.onCaptionChange The callback that will be called each time the caption is updated.
 * @param {String} props.userName The name of the user that published the photo
 * @param {String} props.title The title of the photo
 * @param {String} [props.caption] The caption to display below the image. Defaults to empty string
 */
export function EditPhoto({ fileUrl, onCaptionChange, title, userName, caption = '' }) {
  return (
    <div class='nh3-mag-integrated-photo'>
      <Credit {...{ title, userName }} />
      <img src={fileUrl} />
      <Caption onChange={onCaptionChange} value={caption} type='photo' />
    </div>
  )
}
