/**
 * Component that displays an alert paragraph.
 * @param {Object} props Component properties
 * @param {String} type The type of alert to show. Should be either 'error' or 'loading'.
 * @param {String} [content=null] The content to display in the alert. Defaults to no content.
 */
export function Alert({ content, type = 'error', ...otherProps }) {
  let className = `components-notice is-${type}`;

  return (
    <div class={className} {...otherProps}>
      <div class="components-notice__content">
        {content}
      </div>
    </div>
  )
}
