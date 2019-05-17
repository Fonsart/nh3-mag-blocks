<?php

/**
 * This file is where you should put the code that bootstraps your plugin
 */

// French NH3 platform URL
define( 'NH3_BLOCKS_ARCHIVE_URL', 'https://dev2.notrehistoire.ch' );

// Plugin class prefixes
define( 'NH3_BLOCKS_CLASS_PREFIX', 'NH3_Blocks' );

/**
 * --- REGISTER AUTOLOADER ---
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

new NH3_Blocks_Plugin();
