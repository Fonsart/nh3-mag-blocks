<?php
/**
 * Template used to display an SSR Links block on the site
 */
?>

<?php if ( array_key_exists( 'data', $att ) && ! empty( $att['data'] ) ) : ?>
	<section class="on-topic-ssr-links">
		<h3 class="on-topic-header"><?php esc_html_e( 'SSR SRG Audiovisual Archives', 'nh3-mag-blocks' ); ?></h3>
    <div class="on-topic-nh3-links__scroll-wrapper">
      <button class="horiz-scroll-nav__bt-backward"><i class="icon"></i></button>
      <button class="horiz-scroll-nav__bt-forward"><i class="icon"></i></button>
      <!-- SSR Links -->
      <?php $nh3_blocks_links_data = json_decode( $att['data'] ); ?>
      <?php foreach ( $nh3_blocks_links_data as $nh3_blocks_link ) : ?>
        <?php include plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . 'templates' . DIRECTORY_SEPARATOR . 'link-card.php'; ?>
      <?php endforeach; ?>
    </div>
	</section>
<?php endif; ?>
