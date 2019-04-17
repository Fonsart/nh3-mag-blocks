<figure class="post-block__media is-sticky">
  <picture>
    <a href="<?php echo NH3_MAG_ARCHIVE_URL; ?>/entries/<?php echo esc_attr( $att['documentHash'] ); ?>" target="_blank">
      <img src="<?php echo esc_attr( $att['mediaThumbnailURL'] ); ?>"/>
    </a>
  </picture>
  <?php if (isset($att['caption'])): ?>
    <figcaption><?php echo esc_html( $att['caption'] ); ?></figcaption>
  <?php endif; ?>
</figure>
