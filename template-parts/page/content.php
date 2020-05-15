<?php
/**
 * Template part for displaying page content in page.php
 *
 * For cards see card.php as that has been removed from this file.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Fump
 * @since 1.0
 * @version 1.0
 *
 *
 */

?>


<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php ign_the_header(); ?>
	<div class="entry-content container-content">
		<?php

		the_content();

		//not sure gutenberg eve has this anymore
		wp_link_pages( array(
			'before'      => '<div class="page-links">' . __( 'Pages:', 'fump' ),
			'after'       => '</div>',
			'link_before' => '<span class="page-number">',
			'link_after'  => '</span>',
		) );

		?>

	</div><!-- .entry-content -->
</article><!-- #page-## -->
