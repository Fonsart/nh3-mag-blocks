<?php if (isset( $att['fileUrl'] ) ) : ?>
  <div class="wp-media-wrapper">
    <img src="<?php echo esc_attr( $att['fileUrl'] ); ?>"/>
  </div>
  <?php if ( isset( $att['caption'] ) || isset( $att['credit']) ) : ?>
    <figcaption>
      <!-- Caption -->
      <?php if ( isset( $att['caption'] ) ) : ?>
        <p class="post-block__media-caption"><?php echo esc_html( $att['caption'] ); ?></p>
      <?php endif; ?>
      <!-- Credit -->
      <?php if ( isset( $att['credit'] ) ) : ?>
        <p class="post-block__media-credits">
          <a href="<?php echo esc_url( NH3_BLOCKS_SITE_URLS[$att['platform']] ); ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
            <?php echo esc_html( $att['credit'] ); ?>
          </a>
        </p>
      <?php endif; ?>
    </figcaption>
  <?php endif; ?>
<?php endif; ?>
