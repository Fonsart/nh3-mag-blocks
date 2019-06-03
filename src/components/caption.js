import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * Simple component that display a "caption" textarea.
 * MUST be called with at least these two props:
 * * `onChange` - Callback function called whenever the textarea value changes. Should accept one param which is the new value.
 * * `value` - The textarea's value
 */
export class Caption extends Component {

  render() {
    return (
      <TextareaControl
        class="nh3-mag-blocks-caption"
        onChange={this.props.onChange}
        placeholder={__("Write a caption for this document")}
        value={this.props.value}
        rows="3"
      />
    )
  }

}
