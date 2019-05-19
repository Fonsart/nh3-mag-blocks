<?php if ( isset( $content ) && ! empty( trim( $content ) ) ) : ?>
  <section class="on-topic-wrapper">
    <h2><?php esc_html_e( 'On Topic', 'nh3-mag-blocks' ); ?></h2>
    <!-- Inner blocks content -->
    <?php echo $content; // phpcs:ignore ?>
  </section>
<?php endif; ?>
