<?php if ( isset( $att['fileUrl'] ) ) : ?>
  <figure class="nh3-block-audio">
    <div class="wp-media-wrapper">
      <audio controls src=<?php echo esc_url($att['fileUrl']) ?>>Your browser does not support the <code>audio</code> element.</audio>
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
