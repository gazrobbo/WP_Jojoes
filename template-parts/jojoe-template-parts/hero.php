<div id="hero" class="layout-center-content">
	<div class="background-image hero-gradient">
		<img src="<?php the_field('hero-image') ?>" alt="">
	</div>

	<div class="container hero-grid">


		<div class="hero-text text-center">
			<h1 id="hero-title">

<!-- large dog breed title for landing pages -->
				<?php 
				$content = get_field('dog_breed_large');
				?>
				<?php if ($content):?>
				<span id="large-breed-title">
					<?php the_field('dog_breed_large') ?>	
					<br>
				</span>
				<?php endif; ?>

<!-- small dog breed title for landing pages -->
				<?php 
				$content = get_field('dog_breed_small');
				?>
				<?php if ($content):?>
				<span id="small-breed-title">
					<?php the_field('dog_breed_small') ?>	
					<br>
				</span>
				<?php endif; ?>


				<?php the_field('title') ?>
			</h1>
			<h2 id="hero-secodary-title"><?php the_field('subtitle') ?>
			</h2>
		</div>

		<a href="#contact" class=" btn-norm btn-color">get in touch</a>

	</div>
</div>
