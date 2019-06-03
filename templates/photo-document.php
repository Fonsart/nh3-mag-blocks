<?php
/**
 * Server-side template used to render `photo-document` blocks on the site
 * Will ONLY displays if the block contains a `fileUrl` property.
 */
?>

<?php if ( isset( $att['fileUrl'] ) ) : ?>
	<figure class="nh3-block-image">
    <?php include plugin_dir_path( NH3_BLOCKS_MAIN_FILE ) . "templates/display-image.php"; ?>
	</figure>
<?php endif; ?>
