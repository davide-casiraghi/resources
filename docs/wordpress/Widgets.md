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

## Unregister widget
``` php
unregister_widget( 'wp_widget_subclass' );
```

## Get widget description
``` php
$widget_description = wp_widget_description( $widget_id );
```
