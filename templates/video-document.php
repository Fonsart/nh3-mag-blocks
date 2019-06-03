<?php
/**
 * Server-side template used to render `video-document` blocks on the site
 * Will ONLY displays if the block contains a `fileUrl` property.
 */
?>

<?php if ( isset( $att['fileUrl'] ) ) : ?>
	<figure class="nh3-block-video">
    <div class="wp-media-wrapper">
      <video controls poster="<?php echo esc_url( $att['thumbnailUrl'] ); ?>">
        <source src="<?php echo esc_url( $att['fileUrl'] ); ?>" type="<?php echo esc_attr( $att['mimeType'] ); ?>">
        <?php printf( esc_html__( 'Your browser does not support the %s element', 'nh3-mag-blocks' ), esc_html( '<video>' ) ); ?>
      </video>
    </div>
    <?php if ( isset( $att['caption'] ) ) : ?>
      <figcaption>
        <p class="post-block__media-caption"><?php echo esc_html( $att['caption'] ); ?></p>
        <p class="post-block__media-credits">
          <a href="<?php echo esc_url( NH3_BLOCKS_SITE_URLS[$att['platform']] ); ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
            <?php echo esc_html( $att['credit'] ); ?>
          </a>
        </p>
      </figcaption>
    <?php endif; ?>
	</figure>
<?php endif; ?>
