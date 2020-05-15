<?php
/**
 * The template for displaying search results pages
 * If you want to have this display with a sidebar, uncomment the sidebar out at the bottom.
 * Add the class .page-template-sidebar-right or left to the main element
 * Or just add the pull in sidebar
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Fump
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">

            <header class="page-header layout-center-content text-center">

                <div class="header-content container-fluid">
                    <?php if ( have_posts() ) : ?>
                        <h1 class="page-title"><?php printf( __( 'Search Results for: %s', 'fump' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
                    <?php else : ?>
                        <h1 class="page-title"><?php _e( 'Nothing Found', 'fump' ); ?></h1>
                    <?php endif; ?>
                    <div class="container-content">
                        <?php get_search_form(); ?>
                    </div>
                </div>
            </header>


	        <div class="container search-items">
		        <section class="card-grid">
			        <?php
			        //default to one section fo cards
			        while ( have_posts() ) : the_post();

				       ign_loop('card');

			        endwhile; // End of the loop.
			        ?>
		        </section><!-- .entry-content -->

		        <div class="container">
			        <?php

			        the_posts_pagination( array(
				        'prev_text'          => ign_get_svg( array( 'icon' => 'arrow-left' ) ) . '<span class="screen-reader-text">' . __( 'Previous page', 'fump' ) . '</span>',
				        'next_text'          => '<span class="screen-reader-text">' . __( 'Next page', 'fump' ) . '</span>' . ign_get_svg( array( 'icon' => 'arrow-right' ) ),
				        'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'fump' ) . ' </span>',
			        ) );

			        ?>

		        </div>
	        </div>

        </main><!-- #main -->
    </div><!-- #primary -->



<?php get_footer();
