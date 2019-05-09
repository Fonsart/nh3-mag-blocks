<?php
/**
 * This file is where you should put the code that bootstraps your plugin
 */

 define( 'NH3_MAG_ARCHIVE_URL', 'https://dev2.notrehistoire.ch');

/**
 * Register the new archive image block for the Gutenberg editor.
 */
function nh3_mag_register_blocks() {
  // Block script
  wp_register_script(
    'nh3-mag-archive-blocks',
    plugins_url( 'build/index.js', NH3_MAG_ARCHIVE_BLOCKS_MAIN_FILE ),
    array(
      'wp-components',
      'wp-i18n',
      'wp-blocks',
      'wp-element',
    ),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_BLOCKS_MAIN_FILE ) . 'build/index.js' )
  );

  // Block CSS in the editor
  wp_register_style(
    'nh3-mag-archive-blocks-style-editor',
    plugins_url( 'build/css/editor.css', NH3_MAG_ARCHIVE_BLOCKS_MAIN_FILE ),
    array( 'wp-edit-blocks' ),
    filemtime( plugin_dir_path( NH3_MAG_ARCHIVE_BLOCKS_MAIN_FILE ) . 'build/css/editor.css' )
  );

  // Block registration : Photo Document
  register_block_type( 'nh3/photo-document', array(
    'editor_script' => 'nh3-mag-archive-blocks',
    'editor_style' => 'nh3-mag-archive-blocks-style-editor',
    // 'style' => 'nh3-mag-photo-document-block-style',
    'render_callback' => load_block_template('photo-document')
  ) );

  // Block registration : Audio Document
  register_block_type( 'nh3/audio-document', array(
    'editor_script' => 'nh3-mag-archive-blocks',
    'editor_style' => 'nh3-mag-archive-blocks-style-editor',
    'render_callback' => load_block_template('audio-document')
  ) );

  // Block registration : Video Document
  register_block_type( 'nh3/video-document', array(
    'editor_script' => 'nh3-mag-archive-blocks',
    'editor_style' => 'nh3-mag-archive-blocks-style-editor',
    'render_callback' => load_block_template('video-document')
  ) );

  // Block registration : On Topic
  register_block_type( 'nh3/on-topic', array(
    'editor_script' => 'nh3-mag-archive-blocks',
    'editor_style' => 'nh3-mag-archive-blocks-style-editor',
    'render_callback' => load_block_template('on-topic')
  ) );

  // Block registration : Featured Image Caption
  // register_block_type( 'nh3/featured-image-caption', array(
  //   'editor_script' => 'nh3-mag-archive-blocks',
  //   'editor_style' => 'nh3-mag-archive-blocks-style-editor'
  // ) );
}
add_action( 'init', 'nh3_mag_register_blocks' );

/**
 * Register a new "NH3 Blocks" block category on the $categories array.
 * @return array The updated block categories array
 */
function nh3_mag_block_category( array $categories ) {
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

/**
 * Factory that generates a closure function to use as the render_callback value of a registered block type.
 * The render function will load the template php file whose name matches the given $name param, and is located in the templates directory.
 * i.e. to load the template `audio-document.php`, call this function passing it 'audio-document' as the $name param value.
 * The template will be able to access all the block attributs with the $att array.
 * @param string $name The name of the template file to load
 * @return function A closure function that takes an array parameter
 */
function load_block_template(string $name) {
  return function(array $att) use ($name) {
    ob_start();
    include plugin_dir_path( NH3_MAG_ARCHIVE_BLOCKS_MAIN_FILE ) . "templates/$name.php";
    return ob_get_clean();
  };
};
