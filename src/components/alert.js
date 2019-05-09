import { DashIcon } from './dash-icon';
import { Spinner } from './spinner';

/**
 * Component that displays an alert paragraph.
 * @param {Object} props Component properties
 * @param {String} type The type of alert to show. Should be either 'error' or 'loading'.
 * @param {String} [content=null] The content to display in the alert. Defaults to no content.
 */
export function Alert({ content = null, ...otherProps }) {
  let className = 'components-base-control nh3-mag-photo-document-alert error';

  return (
    <p class={className} {...otherProps}>
      <span class="icon">
        <DashIcon name="warning" />
      </span>
      {content &&
        <span class="content">
          {content}
        </span>
      }
    </p>
  )
}
