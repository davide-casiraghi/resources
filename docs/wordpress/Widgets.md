---
id: wp_widgets
title: Widgets
---

## Register widget
``` php
add_action( 'widgets_init', 'register_widget' );
function register_widget() {
    register_widget( 'wp_widget_subclass' );
}
```

## Register widget area
``` php
function agiledrop_widgets_init() {
	register_sidebar( array(
		'name'          => 'Agiledrop right sidebar',
		'id'            => 'agiledrop-right-sidebar',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2>',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'agiledrop_widgets_init' );
```

## Check if sidebar is in use
``` php
is_active_sidebar( 'agiledrop-right-sidebar' );
```

## Display sidebar
``` php
dynamic_sidebar( 'agiledrop-right-sidebar' );
```

## Unregister widget
``` php
unregister_widget( 'wp_widget_subclass' );
```

## Get widget description
``` php
$widget_description = wp_widget_description( $widget_id );
```
