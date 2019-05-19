import { Component } from '@wordpress/element';
import { AUDIO_TYPE, GALLERY_TYPE, PHOTO_TYPE, STORY_TYPE, VIDEO_TYPE } from '../models/resources';
import { DashIcon } from './dash-icon';

export class LinkCard extends Component {

  constructor(props) {
    super(props);
    this.class = `nh3-mag-blocks-link-card ${this.props.content.type}`;

    // Define the correct icon
    switch (this.props.content.type) {
      case PHOTO_TYPE:
        this.icon = <DashIcon name="format-image" />; break;
      case AUDIO_TYPE:
        this.icon = <DashIcon name="format-audio" />; break;
      case VIDEO_TYPE:
        this.icon = <DashIcon name="format-video" />; break;
      case GALLERY_TYPE:
        this.icon = <span>{this.props.content.nbDoc} <DashIcon name="format-gallery" /></span>; break;
      case STORY_TYPE:
        this.icon = <DashIcon name="format-quote" />; break;
      default:
        this.icon = <DashIcon name="format-aside" />;
    }
  }

  render() {
    return (
      <div class={this.class}>
        <a href={this.props.url} target="_blank">
          <figure>
            <img src={this.props.content.cover} />
          </figure>
          <div class="infos">
            <h3 class="title">{this.props.content.title}</h3>
            <div class="user">
              <img src={this.props.content.user.avatar} />
              <span>{this.props.content.user.name}</span>
            </div>
            <span class="type">{this.icon}</span>
          </div>
        </a>
      </div>
    );
  }

}
