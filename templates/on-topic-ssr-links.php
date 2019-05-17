<?php if ( array_key_exists( 'data', $att ) && ! empty( $att['data'] ) ) : ?>
	<section class="on-topic-ssr-links">
		<h3><?php esc_html_e( 'SSR SRG Audiovisual Archives', 'nh3-mag-blocks' ); ?></h3>
		<?php $nh3_blocks_links_data = json_decode( $att['data'] ); ?>
		<?php foreach ( $nh3_blocks_links_data as $nh3_blocks_link ) : ?>
			<?php include plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . 'templates' . DIRECTORY_SEPARATOR . 'link-card.php'; ?>
		<?php endforeach; ?>
	</section>
<?php endif; ?>
