---
id: wp_posts
title: Posts
---

## Register custom post types, with minimal requirements
``` php
register_post_type( 'agiledrop',
  array(
    'labels'      => array(
      'name'          => __( 'Jobs', 'textdomain' ),
      'singular_name' => __( 'Job', 'textdomain' ),
    ),
    'public'      => true,
    'has_archive' => true,
  )
);
```

## Get all posts from custom post type
``` php
$posts = get_posts( array( 'numberposts'  => -1, 'post_type' => 'custom_post_type' ) );
```

## Get a list of all public registered post types
``` php
$post_types = get_post_types( array( 'public' => true ) );
```

## Get a list of all registered custom post type
``` php
$custom_post_types = get_post_types( array( '_builtin' => false ) );
```

## Get the post thumbnail URL
``` php
$thumbnail_url = get_the_post_thumbnail_url( get_the_ID() );
```

## Force delete post
``` php
wp_delete_post( $post_id, true );
```

## Move post to trash
``` php
wp_trash_post( $post_id );
```

## Get child pages of current page
``` php
$child_pages = get_pages( array( 'child_of' => $post->ID ) );
```

## Add meta box 
``` php
add_meta_box(
	'agiledrop-video',
	__( 'Featured Video', 'themedomain' ),
	'metabox_callback',
	'agiledrop-hero',
	'side',
	'low'
);
```