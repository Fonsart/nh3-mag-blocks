<?php

/**
 * This file is where you should put the code that bootstraps your plugin
 */

// French NH3 platform URL
define( 'NH3_BLOCKS_ARCHIVE_URL', 'https://dev2.notrehistoire.ch' );

// Plugin class prefixes - All classes MUST be prefixed with this in order for them to be auto-loaded
define( 'NH3_BLOCKS_CLASS_PREFIX', 'NH3_Blocks' );

// Site URLS - **Should match the URLs in the ./src/env/*.json file**
define( 'NH3_BLOCKS_SITE_URLS', array(
  'fr' => 'https://notrehistoire.ch',
  'it' => 'https://lanostrastoria.ch',
  'rm' => 'https://nossaistorgia.ch'
) );

/**
 * --- REGISTER AUTOLOADER ---
 * Check that the class to load has the required prefix.
 * Then generate the absolute path to the file, using the WordPress classes naming rules
 */
spl_autoload_register(
	function( $class_name ) {
		// Only process the class name if it starts with the expected prefix
		if ( boolval( preg_match( '/^' . NH3_BLOCKS_CLASS_PREFIX . '.*/', $class_name ) ) ) {
			$class_name_parts = explode( '_', $class_name );
			$classes_dir      = realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR;
			$class_file       = strtolower( 'class-' . implode( '-', $class_name_parts ) . '.php' );
			require_once $classes_dir . $class_file;
		}
	}
);

/**
 * --- Instanciate the plugin ---
 */
new NH3_Blocks_Plugin();
