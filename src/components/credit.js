import { __ } from '@wordpress/i18n';

export function Credit({ title, userName }) {
  return (
    <p class="nh3-mag-blocks-credit">
      <span>{`"${title ? title : __('Untitled')}" ${__('published by')} ${userName}`}</span>
    </p>
  )
}
