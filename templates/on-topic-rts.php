<section class="on-topic-ssr-links">
  <h3><?php esc_html_e('SSR SRG Audiovisual Archives', 'nh3-mag-blocks'); ?></h3>
  <?php $linksData = json_decode($att['data']); ?>
  <?php foreach ($linksData as $key => $link) : ?>
    <?php include( plugin_dir_path( NH3_MAG_BLOCKS_MAIN_FILE ) . 'templates' . DIRECTORY_SEPARATOR . 'link-card.php' ); ?>
  <?php endforeach; ?>
</section>
