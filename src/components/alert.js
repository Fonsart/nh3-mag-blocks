import { Component } from "@wordpress/element";

/**
 * Component that displays an alert paragraph.
 */
export class Alert extends Component {

  /**
   * If no "type" attribute is defined for the component, it will defaults to an "error" alert.
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.class = `components-notice is-${this.props.type || 'error'}`;
  }

  render() {
    return (
      <div class={this.class}>
        <div class="components-notice__content">
          {this.props.content}
        </div>
      </div>
    )
  }

}
