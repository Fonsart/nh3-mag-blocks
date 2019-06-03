<?php

if ( ! class_exists( 'NH3_Blocks_Featured_Image' ) ) {

  /**
   * This class sets up WordPress so that the native Featured image is replace with a custom featured image
   */
  class NH3_Blocks_Featured_Image {

    // This is the meta value attached to posts that contains the featured image properties
    const CUSTOM_META_NAME = 'nh3_mag_custom_featured_image_field';

    public function __construct() {
      add_filter( 'post_thumbnail_html', array($this, 'display_custom_featured_image'), 10, 4 );
      $this->register_custom_meta();
    }

    /**
     * Hook function that is called whenever the function `the_post_thumbnail` is called in a theme.
     * It displays the HTML for the custom featured image, if the current post does indeed have the required meta with at least a `fileUrl` property.
     * If it's not the case, then the original HTML is rendered instead.
     * @param string $html The original HTML
     * @param integer $post_id The post ID for which the featured image will be displayed
     * @param string $post_thumbnail_id _unusued_
     * @param string $size A string that is used to alter the rendered HTML.
     * @see {@link ../templates/display-image.php}
     * @return string The rendered HTML
     */
    public function display_custom_featured_image(string $html, int $post_id, string $post_thumbnail_id, string $size) {
      $att = json_decode(get_post_meta( $post_id, self::CUSTOM_META_NAME, true ), true);
      if ( isset( $att['fileUrl'] ) ) {
        ob_start();
        include plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . "templates/display-image.php";
        return ob_get_clean();
      } else {
        return $html;
      }
    }

    /**
     * Registers the custom meta used for the custom featured image feature.
     */
    public function register_custom_meta() {
      register_meta( 'post', self::CUSTOM_META_NAME, array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
      ) );
    }

  }

}
