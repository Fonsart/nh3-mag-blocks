import { Credit } from "./credit";
import { Caption } from "./caption";

/**
 * Represents an audio document in the Gutenberg editor.
 * Contains an input for the document caption
 * @param {Objects} props The component properties
 * @param {String} props.fileUrl The audio file url
 * @param {String} propos.userName The NH3 user name that posted the media
 * @param {Function} props.onCaptionChange Callback that will be called each time th caption is changed by the user
 * @param {String} [props.caption=null] The audio caption. Defaults to null
 * @param {String} [props.title=null] The audio title. Defaults to null
 */
export function EditAudio({ fileUrl, userName, onCaptionChange, caption = null, title = null }) {
  return (
    <div class="nh3-mag-edit-integrated-audio">
      <Credit {...{ title, userName }} />
      <audio controls src={fileUrl}>Your browser does not support the <code>audio</code> element.</audio>
      <Caption type='audio' onChange={onCaptionChange} value={caption} />
    </div>
  )
}
