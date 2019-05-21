<?php

class NH3_Blocks_Featured_Image {

  const CUSTOM_META_NAME = 'nh3_mag_custom_featured_image_field';

  public function __construct() {
    add_filter( 'post_thumbnail_html', array($this, 'display_custom_featured_image'), 10, 4 );
    $this->register_custom_meta();
  }

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

  public function register_custom_meta() {
    register_meta( 'post', self::CUSTOM_META_NAME, array(
      'show_in_rest' => true,
      'single' => true,
      'type' => 'string',
    ) );
  }

}
