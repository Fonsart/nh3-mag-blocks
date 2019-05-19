import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
import { Component } from '@wordpress/element';

export class Caption extends Component {
  constructor(props) {
    super(props);
    this.placeholder = __("Write a caption for this document");
    this.class = "nh3-mag-blocks-caption"
    this.rows = 2;
  }

  render() {
    return (
      <TextareaControl
        class={this.class}
        onChange={this.props.onChange}
        placeholder={this.placeholder}
        value={this.props.value}
        rows={this.rows}
      />
    )
  }
}
