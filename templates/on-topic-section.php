<?php if ( isset( $content ) ) : ?>
  <h2><?php esc_html_e('On Topic', 'nh3-mag-blocks'); ?></h2>
  <?php echo $content; // $content contains the processed internal blocks. ?>
<?php endif; ?>
