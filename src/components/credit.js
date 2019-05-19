import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { Component } from '@wordpress/element';

export class Credit extends Component {

  render() {
    return (
      <TextControl
        class="nh3-mag-blocks-credit"
        onChange={this.props.onChange}
        placeholder={__("Write this document's credit")}
        value={this.props.value}
      />
    )
  }

}
