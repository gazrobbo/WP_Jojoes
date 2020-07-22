<div id="services" class="layout-center-content divider">
	<div class="container">



		<div class="services-grid">
			<h2 class="color ">services</h2>




			<?php query_posts('post_type=services'); ?>
			<?php

while ( have_posts() ) : the_post();
?>

			<div class="service-card">

<div class="service-card-shadow"></div>

				<div class="service-image-container layout-center-content">
					<div class="service-image">

					<?php 
		$image = get_field('image');
		$size = 'full'; // (thumbnail, medium, large, full or custom size)
		if( $image ) {
				echo wp_get_attachment_image( $image, $size );
		}
		?>
					
					</div>
				</div>

				<div class="service-card-text">
					<h3> <?php the_field('title') ?>
					</h3>
					<p>
						<?php the_field('description') ?>
					</p>
				</div>

				<section class="service-price">from
					<span class="bold">
						<?php the_field('price') ?>
					</span>
				</section>


			</div>
			<?php
endwhile; // End of the loop.
    ?>

			<?php wp_reset_query(); ?>


			<a href="#contact" class="btn-norm  btn-color">book now</a>
		</div>


	</div>
</div>
