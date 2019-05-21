<?php $nh3_blocks_with_caption = isset($att['caption']) && (!isset($size) || 'full' === $size); ?>
<?php $nh3_blocks_with_credit = isset($att['credit']) && (!isset($size) || 'full' === $size); ?>
<?php if (isset( $att['fileUrl'] ) ) : ?>
  <div class="wp-media-wrapper">
    <img src="<?php echo esc_attr( $att['fileUrl'] ); ?>"/>
  </div>
  <?php if ( $nh3_blocks_with_caption || $nh3_blocks_with_credit ) : ?>
    <figcaption>
      <!-- Caption -->
      <?php if ( $nh3_blocks_with_caption ) : ?>
        <p class="post-block__media-caption"><?php echo esc_html( $att['caption'] ); ?></p>
      <?php endif; ?>
      <!-- Credit -->
      <?php if ( $nh3_blocks_with_credit ) : ?>
        <p class="post-block__media-credits">
          <a href="<?php echo esc_url( NH3_BLOCKS_SITE_URLS[$att['platform']] ); ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
            <?php echo esc_html( $att['credit'] ); ?>
          </a>
        </p>
      <?php endif; ?>
    </figcaption>
  <?php endif; ?>
<?php endif; ?>
