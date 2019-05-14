/**
 * Component that displays a WordPress dashicons.
 * The given props.name value must be one of the officially available icon name,
 * stripped off the `dashicons` prefix.
 * i.e. if you want to display the icon named `dashicons-external`,
 * pass the `name` property the value `external`.
 * @see https://developer.wordpress.org/resource/dashicons/
 * @param {Object} props Component properties
 * @param {String} props.name The dash icon name
 */
export function DashIcon({ name }) {
  return <span class={`dashicons dashicons-${name}`}></span>
}
