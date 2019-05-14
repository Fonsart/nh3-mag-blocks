import { __ } from '@wordpress/i18n';

import { Alert } from './alert';
import { LinkCard } from './link-card';

export function LinkContent({ value }) {
  let content;
  if (!value.result) {
    content = <Alert content={<span><span class="url">"{value.url}"</span> - {__('No resource found for this URL')}</span>} />;
  } else if (value.result.error) {
    content = <Alert content={<span><span class="url">"{value.url}"</span> - {value.result.error}</span>} />;
  } else {
    content = <LinkCard content={value.result} url={value.url} />;
  }
  return <div class="nh3-mag-block-link-content">{content}</div>;
}
