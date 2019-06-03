import { __ } from '@wordpress/i18n';

import { makeOnTopicBlockDefinition } from '../utils/on-topic-links-block-factory';

/**
 * Block used to insert SSR links
 * Is only insertable inside an "On Topic" block.
 * @see {@link ../utils/on-topic-links-block-factory.js} for the details of the block logic
 */
export default makeOnTopicBlockDefinition({
  title: __('RTS/SRF/RSI/RTR Links'),
  sectionTitle: __('SSR SRG Audiovisual Archives')
});
