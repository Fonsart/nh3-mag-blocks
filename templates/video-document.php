<?php if ( isset( $att['fileUrl'] ) ) : ?>
	<figure class="nh3-block-video">
	<div class="wp-media-wrapper">
		<video controls poster="<?php echo esc_url( $att['thumbnailUrl'] ); ?>">
		<source src="<?php echo esc_url( $att['fileUrl'] ); ?>" type="<?php echo esc_url( $att['mimeType'] ); ?>">
		Your browser does not support the <code>video</code> element.
		</video>
	</div>
	<p class="post-block__media-credits">
		<a href="<?php echo esc_url( NH3_BLOCKS_ARCHIVE_URL ); ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
		"<?php echo esc_html( isset( $att['title'] ) ? $att['title'] : __( 'Untitled', 'nh3-mag-blocks' ) ); ?>", <?php esc_html_e( 'published by', 'nh3-mag-blocks' ); ?> <?php echo esc_html( $att['userName'] ); ?>
		</a>
	</p>
	<?php if ( isset( $att['caption'] ) ) : ?>
		<figcaption>
      <p class="post-block__media-caption"><?php echo esc_html( $att['caption'] ); ?></p>
      <p class="post-block__media-credits">
        <a href="<?php echo esc_url( NH3_BLOCKS_ARCHIVE_URL ); ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
        "<?php echo esc_html( isset( $att['title'] ) ? $att['title'] : __( 'Untitled', 'nh3-mag-blocks' ) ); ?>", <?php esc_html_e( 'published by', 'nh3-mag-blocks' ); ?> <?php echo esc_html( $att['userName'] ); ?>
        </a>
      </p>
    </figcaption>
	<?php endif; ?>
	</figure>
<?php endif; ?>
