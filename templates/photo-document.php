<?php if ( isset( $att['fileUrl'] ) ) : ?>
	<figure class="nh3-block-image">
	<a href="<?php echo esc_url( NH3_BLOCKS_ARCHIVE_URL ); ?>/entries/<?php echo esc_attr( $att['hash'] ); ?>" target="_blank">
		<div class="wp-media-wrapper">
		<img src="<?php echo esc_attr( $att['fileUrl'] ); ?>"/>
		</div>
		<p class="post-block__media-credits">"<?php echo esc_html( isset( $att['title'] ) ? $att['title'] : __( 'Untitled', 'nh3-mag-blocks' ) ); ?>", <?php esc_html_e( 'published by', 'nh3-mag-blocks' ); ?> <?php echo esc_html( $att['userName'] ); ?></p>
	</a>
	<?php if ( isset( $att['caption'] ) ) : ?>
		<figcaption><?php echo esc_html( $att['caption'] ); ?></figcaption>
	<?php endif; ?>
	</figure>
<?php endif; ?>
