<?php
/**
 * Displays footer site info
 *
 * @package Fump
 * @since 1.0
 * @version 1.0
 */

?>

<a href="https://www.facebook.com/JojoesDogGroomingService/">
<?php
  echo ign_get_svg( array("icon" => "facebook-official") );
?>
</a>
<div class="site-info gutters text-center">
    <a target="_blank" href="<?php echo esc_url('http://garyrobinson.co.uk'); ?>"><?php printf( __(
			'© %s Created by %s with Ignition. Proudly powered by %s', 'fump' ), date('Y'), 'Gary Robinson', 'WordPress' ); ?></a>
</div><!-- .site-info -->
