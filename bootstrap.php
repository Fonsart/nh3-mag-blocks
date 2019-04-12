<?php
/**
 * This file is where you should put the code that bootstraps your plugin
 */

function block_dynamic_render_cb ( $att ) {
  if (isset($att['id']) && isset($att['path']) ) {
    // Coming from RichText, each line is an array's element
    $sum = $att['id'] + $att['path'];
    $html = "<h1>$sum</h1>";
    return $html;
  } else {
    return '';
  }
}

add_action( 'init', function() {
  // Block script
  wp_register_script(
    'nh3-mag-archive-image-block',
    plugins_url( 'build/index.js', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ),
    array(
      'wp-blocks',
      'wp-editor',
      'wp-components',
      'wp-i18n'
    ),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ) . 'build/index.js' )
  );

  // Block CSS in the editor
  wp_register_style(
    'nh3-mag-archive-image-block-style-editor',
    plugins_url( 'build/css/editor.css', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ),
    array( 'wp-edit-blocks' ),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ) . 'build/css/editor.css' )
  );

  // Block CSS in the site
  wp_register_style(
    'nh3-mag-archive-image-block-style',
    plugins_url( 'build/css/style.css', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ),
    array(),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ) . 'build/css/style.css' )
  );

  // Block registration
  register_block_type( 'nh3/archive-image', array(
    'editor_script' => 'nh3-mag-archive-image-block',
    'editor_style' => 'nh3-mag-archive-image-block-style-editor',
    'style' => 'nh3-mag-archive-image-block-style',
    'render_callback' => 'block_dynamic_render_cb'
  ) );
} );
