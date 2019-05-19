import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import capitalize from 'lodash.capitalize';

export function UrlInput({ onChange, entryType, value = '', className = null }) {

  return (
    <TextControl
      className={`nh3-mag-blocks-url-input ${className}`}
      label={__(`${capitalize(entryType)} Entry URL`)}
      placeholder={__('https://dev.[platform-name].ch/entries/[id]')}
      value={value}
      onChange={onChange}
    />
  )
}
