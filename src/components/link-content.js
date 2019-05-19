import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Alert } from './alert';
import { LinkCard } from './link-card';

export class LinkContent extends Component {

  constructor(props) {
    super(props);
    // Define content
    if (!this.props.value.resource) {
      this.content = <Alert content={<span><span class="url">"{this.props.value.url}"</span> {__('does not match any existing resource')}</span>} />;
    } else if (this.props.value.resource.error) {
      this.content = <Alert content={<span><span class="url">"{this.props.value.url}"</span> {this.props.value.resource.error}</span>} />;
    } else {
      this.content = <LinkCard content={this.props.value.resource} url={this.props.value.url} />;
    }
  }

  render() {
    return <div class="nh3-mag-block-link-content">{this.content}</div>;
  }

}
