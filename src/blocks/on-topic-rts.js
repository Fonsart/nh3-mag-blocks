import { __ } from '@wordpress/i18n';

export default {
  title: __('RTS/SRF/RSI/RTR Links'),
  icon: 'admin-links',
  category: 'nh3-mag-blocks',
  parent: [ 'nh3/on-topic-section' ],
  supports: {
    multiple: false
  },
  attributes: {

  },
  edit({ className, attributes, setAttributes }) {
    return (
      <div className={className}>
        <p>List of RTS/SRF/RSI/RTR related links</p>
      </div>
    )
  },
  save() {
    return null;
  }
}
