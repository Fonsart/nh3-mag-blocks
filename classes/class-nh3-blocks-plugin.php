<?php

/**
 * This class is used to initialize the plugin when instanciated
 */
class NH3_Blocks_Plugin {

	/**
	 * To register a new block, add an item to this list.
	 * The new block will be registered under `nh3/[new-item-value].
	 * e.g. adding a "test-block" string to this array will register a new block named "nh3/test-block"
	 *
	 * **Note:** You MUST create a new php file with the same name as the new item in the `templates` directory.
	 * e.g. for the "nh3/test-block", create a new `test-block.php` file
	 *
	 * @see $this->register_blocks()
	 */
	const BLOCKS = array(
		'photo-document',
		'audio-document',
		'video-document',
		'on-topic-section',
		'on-topic-nh3-links',
		'on-topic-ssr-links',
	);

	/**
	 * Subscribe to the used hooks and filters
	 */
	public function __construct() {
		add_filter( 'block_categories', array( $this, 'register_block_category' ), 10, 1 );
    add_action( 'init', array( $this, 'init' ) );
  }

  /**
   * Actions done in the `init` WordPress hook.
   */
  public function init() {
    $this->load_text_domain();
    $this->register_blocks();
    new NH3_Blocks_Featured_Image();
  }

  /**
   * Loads the text domain for the translations
   */
  public function load_text_domain() {
    load_plugin_textdomain( 'nh3-mag-blocks', null, '/nh3-mag-blocks/languages' );
  }

	/**
	 * Register a new "NH3 Blocks" block category on the $categories array.
	 * Used on the `block_categories` filter.
	 * @see https://developer.wordpress.org/reference/hooks/block_categories/
	 * @param array $categories The categories array, provided by WordPress
	 * @return array The updated block categories array
	 */
	public function register_block_category( array $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'nh3-mag-blocks',
					'title' => __( 'NH3 Blocks', 'nh3-mag-blocks' ),
				),
			)
		);
	}

	/**
	 * Register the new NH3 blocks
	 * Uses the static constant BLOCKS defined at the beginning of this file to actually register the blocks
	 */
	public function register_blocks() {
		// Block script
		wp_register_script(
			'nh3-mag-blocks',
			plugins_url( 'build/index.js', NH3_BLOCKS_MAIN_FILE ),
			array(
				'wp-components',
				'wp-i18n',
				'wp-blocks',
				'wp-element',
        'wp-editor',
        'wp-data',
        'wp-compose'
			),
			filemtime( plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . 'build/index.js' )
		);

		// Block CSS in the editor
		wp_register_style(
			'nh3-mag-blocks-style-editor',
			plugins_url( 'build/css/editor.css', NH3_BLOCKS_MAIN_FILE ),
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . 'build/css/editor.css' )
		);

		// Register the blocks
		foreach ( self::BLOCKS as $block_name ) {
			register_block_type(
				"nh3/$block_name", array(
					'editor_script'   => 'nh3-mag-blocks',
					'editor_style'    => 'nh3-mag-blocks-style-editor',
					'render_callback' => $this->generate_template_loader( $block_name ),
				)
			);
		}
	}

	/**
	 * Factory that generates a closure function to use as the render_callback value of a registered block type.
	 * The render function will load the template php file whose name matches the given $name param, and is located in the templates directory.
	 * i.e. to load the template `audio-document.php`, call this function passing it 'audio-document' as the $name param value.
	 * The template will be able to access all the block attributs with the $att array.
	 * @param string $name The name of the template file to load
	 * @return function A closure function that takes an $att and $content parameter and uses the $name param
	 */
	public function generate_template_loader( string $name ) {
		return function( array $att, $content ) use ( $name ) {
			ob_start();
			include plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . "templates/$name.php";
			return ob_get_clean();
		};
	}
}
