---
id: wp_enqueues
title: Enqueues
---

## Enqueue a script
``` php
wp_enqueue_script( 'agiledrop-js', get_template_directory_uri() . '/script.js', array(), $theme_version, true );
```

## Enqueue style
``` php
wp_enqueue_style( 'agiledrop-style', get_stylesheet_uri(), array(), $theme_version, 'all' );
```

## Add metadata to a CSS script
``` php
wp_style_add_data( 'agiledrop-style', 'rtl', 'replace' );
```

## Add metadata to a script
``` php
wp_script_add_data( 'agiledrop-js', 'async', true );
```

## Get theme directory uri
``` php
get_template_directory_uri();
```