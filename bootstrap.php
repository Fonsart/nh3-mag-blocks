<?php
/**
 * This file is where you should put the code that bootstraps your plugin
 */

add_action( 'enqueue_block_editor_assets', function() {
  wp_enqueue_script(
    'nh3-mag-archive-image-block',
    plugins_url( 'build/index.js', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ),
    array('wp-blocks', 'wp-element')
  );
} );

add_action( 'enqueue_block_assets', function() {
  wp_enqueue_style(
    'nh3-mag-archive-image-block-style',
    plugins_url( 'build/css/style.css', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE )
  );
} );
