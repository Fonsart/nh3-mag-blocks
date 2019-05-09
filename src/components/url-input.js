import capitalize from 'lodash.capitalize';

import { BASE_URL, validateEntryUrl } from '../utils';

const { __ } = wp.i18n;
const { TextControl } = wp.components;

export function UrlInput({ onChange, entryType, value = '' }) {

  return (
    <TextControl
      className='nh3-mag-blocks-url-input'
      label={__(`${capitalize(entryType)} Entry URL`)}
      placeholder={`${BASE_URL}/[${__('hash_value')}]`}
      value={value}
      onChange={onChange}
    />
  )
}
