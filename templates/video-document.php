<?php if ( isset( $att['fileUrl'] ) ) : ?>
  <figure class="nh3-block-video">
    <div class="wp-media-wrapper">
      <video controls poster="<?php echo esc_url($att['thumbnailUrl']); ?>">
        <source src="<?php echo esc_url($att['fileUrl']) ?>" type="<?php echo esc_url($att['mimeType']) ?>">
        Your browser does not support the <code>video</code> element.
      </video>
    </div>
    <p class="post-block__media-credits">
      <a href="<?php echo NH3_MAG_ARCHIVE_URL; ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
        "<?php echo esc_html(isset($att['title']) ? $att['title'] : __('Untitled', 'nh3-mag')); ?>", <?php _e('published by', 'nh3-mag'); ?> <?php echo esc_html( $att['userName'] ); ?>
      </a>
    </p>
    <?php if( isset( $att['caption'] ) ) : ?>
      <figcaption><?php echo esc_html($att['caption']); ?></figcaption>
    <?php endif; ?>
  </figure>
<?php endif; ?>
