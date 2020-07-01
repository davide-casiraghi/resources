---
last_modified_on: "2020-06-22"
title: Custom post type
description: Extend WP built-in content types with your own custom post type in theme. 
series_position: null
author_github: https://github.com/zkoracin
author_name: Žiga Koračin
tags: ["language: php", "framework: wordpress"]
---

## Class for registering post types
We will tackle the registration of CPT(custom post type) in a more OOP way.<br/>
Create a new file class-custom-post-types.php in the same directory where functions.php is located in the theme folder.
Inside the file paste the following code.
``` php
class Custom_Post_Types {
  public function __construct() {
    add_action( 'init', array( $this, 'register_post_types' ) );
  }
  public function register_post_types(){
    register_post_type( 'my_cpt',
      array(
        'labels'      => array(
          'name'          => 'My Cpts',
          'singular_name' => 'My Cpt'
        ),
        'public'      => true,
        'has_archive' => true,
      )
    );
  }
}
```
We used the class constructor to call Wordpress to init action with a callback to our
register_post_types method. Inside the method we are using wp built-in function, to register
our CPT. <br/>
Register_post_type function excepts a number of parameters, but for now, we used
only minimal requirements to make this work, we will extend it later.<br/>  

## Include class 
The only thing left is to include our class in function.php. Copy the following
code to functions.php with this in place you are all set for using your own CPT.
``` php
require_once get_template_directory() . '/class-custom-post-types.php';
new Custom_Post_Types();
```
Here we first required our file and then created an object of the class custom post types.

## Internationalization
Currently, our CPT doesn't support translations. The name My Cpt would stay the 
same in all wp installations. To fix that we need to update our register_post_type,
to support text-domain.
``` php
'labels'      => array(
          'name'          => __( 'My Cpts', 'textdomain' ),
          'singular_name' => __( 'My Cpt', 'textdomain' ),
        ),
```

We used localization function (__), so the string My Cpt could be translated into other languages.<br/>

## Additional parameters for register cpt
You can add additional parameters for registering CPT based on your needs. Take a look at 
[Wordpress docs](https://developer.wordpress.org/reference/functions/register_post_type/#parameters) <br/>
We will extend our CPT with description, slug and parameters to support Gutenberg.
``` php
register_post_type( 'my_cpt',
      array(
        'labels'      => array(
          'name'          => __( 'My Cpts', 'textdomain' ),
          'singular_name' => __( 'My Cpt', 'textdomain' ),
        ),
        'public'        => true,
        'has_archive'   => true,
        'description'   => 'My first cpt',
        'rewrite'       => array( 'slug' => 'my-cpt'),
        'supports'      => array( 'editor'),
        'show_in_rest'  => true,
      )
    );
```