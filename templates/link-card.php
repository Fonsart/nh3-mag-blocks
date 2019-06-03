<?php
/**
 * Template used to display a link card on the site.
 */
?>

<a class="on-topic__nav-item on-topic__<?php echo esc_attr( $nh3_blocks_link->resource->type ); ?>" href="<?php echo esc_url( $nh3_blocks_link->url ); ?>" target="_blank">
  <!-- Media cover -->
  <figure class="on-topic__nav-item__cover">
  	<img class="on-topic__nav-item__cover" src="<?php echo esc_url( $nh3_blocks_link->resource->cover ); ?>">
    <?php if ( isset( $nh3_blocks_link->resource->title ) ) : ?>
      <!-- Document title -->
      <span class="on-topic__nav-item__<?php echo esc_attr( $nh3_blocks_link->resource->type ); ?>-title"><?php echo esc_html( $nh3_blocks_link->resource->title ); ?></span>
    <?php endif; ?>
    <?php if ( 'gallery' === $nh3_blocks_link->resource->type ) : ?>
      <!-- Gallery entry count -->
      <span class="on-topic__nav-item__doc-count">
        <span class="on-topic__nav-item__doc-count__counter"><?php echo esc_html( $nh3_blocks_link->resource->nbDoc ); ?></span> <?php $nh3_blocks_link->resource->nbDoc > 1 ? esc_html_e( 'documents', 'nh3-mag-blocks' ) : esc_html_e( 'document', 'nh3-mag-blocks' ); ?>
      </span>
    <?php endif; ?>
  </figure>
	<!-- User information -->
	<div class="on-topic__nav-item__member">
	<img class="on-topic__nav-item__avatar" src="<?php echo esc_url( $nh3_blocks_link->resource->user->avatar ); ?>">
	<span class="on-topic__nav-item__member__name">
		<?php echo esc_html( $nh3_blocks_link->resource->user->name ); ?>
	</span>
	</div>
</a>
