<?php
/**
 * Server-side template used to render `audio-document` blocks on the site
 * Will ONLY displays if the block contains a `fileUrl` property.
 */
?>

<?php if ( isset( $att['fileUrl'] ) ) : ?>
	<figure class="nh3-block-audio">
    <div class="wp-media-wrapper">
      <audio controls src=<?php echo esc_url( $att['fileUrl'] ); ?>>
        <?php printf( esc_html__( 'Your browser does not support the %s element', 'nh3-mag-blocks' ), esc_html( '<audio>' ) ); ?>
      </audio>
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
