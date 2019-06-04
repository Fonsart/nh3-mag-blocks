import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Alert } from './alert';
import { LinkCard } from './link-card';

/**
 * This component is used in the On Topic blocks to display the content of a pasted link.
 * It will either display an Alert if the link errored, or a LinkCard if the link is valid
 * It MUST be called with a `value` prop, that represents what should be displayed.
 * This `value` prop should have a `resource` object, otherwise it means that the link is a 404
 * If the `resource` object exists but have an `error` property, this means that the link is not valid (@see {@link ../utils/link-management.js#L32})
 * @see {@link ./link-card.js} for more details on what the `value.resource` object should be
 */
export class LinkContent extends Component {

  /**
   * Whenever this component receive new props from its parent, reevaluates what its content should be
   * @param {Object} newProps The new props
   */
  componentWillReceiveProps(newProps) {
    // Define content based on the value prop
    if (!newProps.value.resource) {
      this.content = <Alert content={<span><span class="url">"{newProps.value.url}"</span> {__('does not match any existing resource')}</span>} />;
    } else if (newProps.value.resource.error) {
      this.content = <Alert content={<span><span class="url">"{newProps.value.url}"</span> {newProps.value.resource.error}</span>} />;
    } else {
      this.content = <LinkCard content={newProps.value.resource} url={newProps.value.url} />;
    }
  }

  render() {
    return <div class="nh3-mag-block-link-content">{this.content}</div>;
  }

}
