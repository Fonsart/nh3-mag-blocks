<?php if ( isset( $att['fileUrl'] ) ) : ?>
  <figure class="nh3-block-image">
    <picture>
      <a href="<?php echo NH3_MAG_ARCHIVE_URL; ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
        <img src="<?php echo esc_attr( $att['fileUrl'] ); ?>"/>
        <p class="post-block__media-credits">"<?php echo esc_html(isset($att['title']) ? $att['title'] : __('Untitled', 'nh3-mag')); ?>", <?php _e('published by', 'nh3-mag'); ?> <?php echo esc_html( $att['userName'] ); ?></p>
      </a>
    </picture>
    <?php if (isset($att['caption'])): ?>
      <figcaption><?php echo esc_html( $att['caption'] ); ?></figcaption>
    <?php endif; ?>
  </figure>
<?php endif; ?>
