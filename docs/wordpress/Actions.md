---
id: wp_actions
title: Actions
---

## After wordpess has finished loading but before headers are sent
``` php
add_action( 'init', 'function_cpt_init' );
```
## Fires when scripts and styles are enqueued
``` php
add_action( 'wp_enqueue_scripts', 'function_include_scripts' );
```