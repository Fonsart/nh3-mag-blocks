import { __ } from '@wordpress/i18n';

export function AreaLabel() {
  return (
    <span class="nh3-mag-blocks-area-label">
      {__('Paste one link per line')} <span>
        ({__('duplicates will be removed')})
      </span>
    </span>
  );
}
