<?php
/**
 * Template used to display an NH3 Links block on the site
 */
?>

<?php if ( array_key_exists( 'data', $att ) && ! empty( $att['data'] ) ) : ?>
	<section class="on-topic-nh3-links">
    <!-- <div class="on-topic-nh3-links__scroll-wrapper"> -->
    <div class="on-topic-nh3-links__wrapper">
      <button class="horiz-scroll-nav__bt-backward"><i class="icon"></i></button>
      <button class="horiz-scroll-nav__bt-forward"><i class="icon"></i></button>
      <!-- NH3 Links -->
      <?php $nh3_blocks_links_data = json_decode( $att['data'] ); ?>
      <?php foreach ( $nh3_blocks_links_data as $nh3_blocks_link ) : ?>
      <div>
        <a href=<?php echo $nh3_blocks_link->url ?>><?php echo $nh3_blocks_link->resource->title?></a>
      </div>
        <?php /* include plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . 'templates' . DIRECTORY_SEPARATOR . 'link-card.php'; */ ?>
      <?php endforeach; ?>
   </div>
	</section>
<?php endif; ?>
