<?php
/**
 * This file is where you should put the code that bootstraps your plugin
 */

 define( 'NH3_MAG_ARCHIVE_URL', 'https://dev2.notrehistoire.ch');

/**
 * THIS FUNCTION IS CALLED BY WORDPRESS. DO NOT CALL IT MANUALLY.
 * Renders the template for the archive image block on the frontend.
 * The template is compiled using the block attributes in the $att param.
 */
function nh3_mag_archive_image_block_render ( $att ) {
  ob_start();
  include plugin_dir_path( NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ) . 'templates/archive-photo.php';;
  return ob_get_clean();
}

/**
 * Register the new archive image block for the Gutenberg editor.
 */
function nh3_mag_archive_image_block() {
  // Block script
  wp_register_script(
    'nh3-mag-archive-photo-block',
    plugins_url( 'build/index.js', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ),
    array(
      'wp-components',
      'wp-i18n'
    ),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ) . 'build/index.js' )
  );

  // Block CSS in the editor
  wp_register_style(
    'nh3-mag-archive-photo-block-style-editor',
    plugins_url( 'build/css/editor.css', NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ),
    array( 'wp-edit-blocks' ),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_IMAGE_BLOCK_MAIN_FILE ) . 'build/css/editor.css' )
  );

  // Block registration
  register_block_type( 'nh3/archive-photo', array(
    'editor_script' => 'nh3-mag-archive-photo-block',
    'editor_style' => 'nh3-mag-archive-photo-block-style-editor',
    // 'style' => 'nh3-mag-archive-photo-block-style',
    'render_callback' => 'nh3_mag_archive_image_block_render'
  ) );
}
add_action( 'init', 'nh3_mag_archive_image_block' );

function nh3_mag_block_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'nh3-mag-blocks',
				'title' => __( 'NH3 Blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'nh3_mag_block_category', 10, 1);
