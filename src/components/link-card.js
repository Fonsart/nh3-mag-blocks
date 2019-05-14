import { DashIcon } from './dash-icon';

export function LinkCard({ content, url }) {
  let icon;
  const classes = `nh3-mag-blocks-link-card ${content.type.toLowerCase()}`;

  // Select the icon based on the type of Link
  switch (content.type.toLowerCase()) {
    case 'photo':
      icon = <DashIcon name="format-image" />; break;
    case 'audio':
      icon = <DashIcon name="format-audio" />; break;
    case 'video':
      icon = <DashIcon name="format-video" />; break;
    case 'gallery':
      icon = <DashIcon name="format-gallery" />; break;
    default:
      icon = <DashIcon name="format-aside" />;
  }

  return (
    <div class={classes}>
      <a href={url} target="_blank">
        <figure>
          <img src={content.cover} />
        </figure>
        <div class="infos">
          <h3 class="title">{content.title}</h3>
          <div class="user">
            <img src={content.user.avatar} />
            <span>{content.user.name}</span>
          </div>
          <span class="type">{icon}</span>
        </div>
      </a>
    </div>
  );
}
