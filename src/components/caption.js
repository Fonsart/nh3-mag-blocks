import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
import { Component } from '@wordpress/element';

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
