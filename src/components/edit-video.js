import { Credit } from "./credit";
import { Caption } from "./caption";

/**
 * Represents a video document in the Gutenberg editor.
 * Contains an input for the document caption
 * @param {Objects} props The component properties
 * @param {String} props.fileUrl The video file URL
 * @param {String} props.thumbnailUrl The video thumbnail URL
 * @param {String} propos.userName The NH3 user name that posted the media
 * @param {Function} props.onCaptionChange Callback that will be called each time the caption is changed by the user
 * @param {String} [props.caption=null] The video caption. Defaults to null
 * @param {String} [props.title=null] The video title. Defaults to null
 */
export function EditVideo({ fileUrl, thumbnailUrl, userName, onCaptionChange, caption = null, title = null }) {
  return (
    <div class="nh3-mag-edit-integrated-video">
      <Credit {...{ title, userName }} />
      <video controls src={fileUrl} poster={thumbnailUrl}>Your browser does not support the <code>video</code> element.</video>
      <Caption type='video' onChange={onCaptionChange} value={caption} />
    </div>
  )
}
