import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

export function Caption({ onChange, value, type = 'document' }) {
  const placeholder = __(`Write a caption for this ${type}`);
  return (
    <TextControl class="nh3-mag-blocks-caption" {...{ onChange, placeholder, value }} />
  )
}
