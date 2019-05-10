import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import capitalize from 'lodash.capitalize';

import { BASE_URL } from '../utils';

export function UrlInput({ onChange, entryType, value = '', className = null }) {

  const label = <span>{__(`${capitalize(entryType)} Entry URL`)} <a class="document-list-link" href={`${BASE_URL}?types=${entryType}`} target="_blank">{__(`${entryType} documents list`)}</a></span>

  return (
    <TextControl
      className={`nh3-mag-blocks-url-input ${className}`}
      label={label}
      placeholder={`${BASE_URL}/[${__('hash_value')}]`}
      value={value}
      onChange={onChange}
    />
  )
}
