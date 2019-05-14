export function LinkCard({ content }) {
  const classes = `nh3-mag-blocks-link-card ${content.type.toLowerCase()}`;

  return (
    <div class={classes}>
      <figure>
        <img src={content.cover} />
      </figure>
      <div class="infos">
        <h3 class="title">{content.title}</h3>
        <div class="user">
          <img src={content.user.avatar} />
          <span>{content.user.name}</span>
        </div>
        <span class="type">{content.type}</span>
      </div>
    </div>
  );
}
