---
id: wp_actions
title: Actions
---
## Using actions
``` php
function register_style() {
    wp_enqueue_style( 'agiledrop-style', get_stylesheet_uri(), array(), '1.0.0', 'all' );
}
add_action( 'wp_enqueue_scripts', 'register_style' );
```
## OOP using actions
``` php
class Agiledrop_Enqueues {
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'register_style' ) );
    }
    public function register_style() {
        wp_enqueue_style( 'agiledrop-style', get_stylesheet_uri(), array(), '1.0.0', 'all' );
    }
}
```
## Fires after WordPress has finished loading but before any headers are sent
``` php
add_action( 'init', 'function_cpt_init' );
```
## Fires when scripts and styles are enqueued
``` php
add_action( 'wp_enqueue_scripts', 'function_include_scripts' );
```
## Fires when scripts are printed for all admin pages
``` php
add_action( 'admin_print_scripts', 'function_print_scripts' );
```
## Fires non-authenticated Ajax actions for logged-out users
``` php
add_action( 'wp_ajax_nopriv_save_form', 'function_save_form' );
```
## Fires authenticated Ajax actions for logged-in users
``` php
add_action( 'wp_ajax_save_form', 'function_save_form' );
```
## Fires before the administration menu loads in the admin
``` php
add_action( 'admin_menu', 'function_add_menu' );
```
## Fires when preparing to serve an API request
``` php
add_action( 'rest_api_init', 'function_register_api' );
```
## Fires once a post has been saved
``` php
add_action( 'save_post', 'function_save_post' );
```
## Fires after all default WordPress widgets have been registered
``` php
add_action( 'widgets_init', 'function_register_widget' );
```