import { __ } from '@wordpress/i18n';
import { makeOnTopicBlockDefinition } from '../utils/on-topic-links-block-factory';

/**
 * Block used to insert NH3 links
 * Is only insertable inside an "On Topic" block.
 * @see {@link ../utils/on-topic-links-block-factory.js} for the details of the block logic
 */
export default makeOnTopicBlockDefinition({
  title: __('NH3 Links'),
  sectionTitle: __('notreHistoire')
});
