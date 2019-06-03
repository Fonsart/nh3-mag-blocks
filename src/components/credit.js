import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * Simple component that displays a "credit" textarea
 * It requires at least two props:
 * * `onChange` - Callback function called when the value of the textarea changes. Should accepts a single param which is the new value
 * * `value` - The value of the textare
 */
export class Credit extends Component {

  render() {
    return (
      <TextareaControl
        class="nh3-mag-blocks-credit"
        onChange={this.props.onChange}
        placeholder={__("Write this document's credit")}
        value={this.props.value}
        rows="2"
      />
    )
  }

}
