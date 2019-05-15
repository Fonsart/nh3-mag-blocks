<a class="on-topic__nav-item on-topic__<?php echo esc_attr( strtolower( $link->result->type ) ); ?>" href="<?php echo esc_url( $link->url ); ?>" target="_blank">
  <!-- Media cover -->
  <img class="on-topic__nav-item__cover" src="<?php echo esc_url( $link->result->cover ); ?>">
  <?php if ( isset( $link->result->title ) ) : ?>
    <!-- Document title -->
    <span class="on-topic__nav-item__<?php echo esc_attr( strtolower( $link->result->type ) ); ?>-title"><?php echo esc_html( $link->result->title ); ?></span>
  <?php endif; ?>
  <?php if ( $link->result->type === 'Gallery' ) : ?>
    <!-- Gallery entry count -->
    <span class="on-topic__nav-item__doc-count">
      <span class="on-topic__nav-item__doc-count__counter"><?php echo esc_html( $link->result->props->nbDoc ); ?></span> <?php $link->result->props->nbDoc > 1 ? esc_html_e('documents', 'nh3-mag-blocks' ) : esc_html_e('document', 'nh3-mag-blocks'); ?>
    </span>
  <?php endif; ?>
  <!-- User information -->
  <div class="on-topic__nav-item__member">
    <img class="on-topic__nav-item__avatar" src="<?php echo esc_url( $link->result->user->avatar); ?>">
    <span class="on-topic__nav-item__member__name">
      <?php echo esc_html( $link->result->user->name ); ?>
    </span>
  </div>
</a>
