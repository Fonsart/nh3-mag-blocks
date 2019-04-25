<figure class="post-block__media is-sticky">
  <picture>
    <a href="<?php echo NH3_MAG_ARCHIVE_URL; ?>/entries/<?php echo esc_attr( $att['document_hash'] ); ?>" target="_blank">
      <img src="<?php echo esc_attr( $att['photo_thumbnail_url'] ); ?>"/>
      <p class="post-block__media-credits">"<?php echo isset($att['photo_title']) ? $att['photo_title'] : esc_html__('Untitled', 'nh3-mag-archive-blocks') ?>", <?php _e('published by', 'nh3-mag-archive-blocks'); ?> <?php echo esc_html( $att['photo_author'] ); ?></p>
    </a>
  </picture>
  <?php if (isset($att['photo_caption'])): ?>
    <figcaption><?php echo esc_html( $att['photo_caption'] ); ?></figcaption>
  <?php endif; ?>
</figure>
