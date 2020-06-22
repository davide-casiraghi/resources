---
id: wp_post_meta
title: Post meta
---

## Get the meta for all keys for the current post
``` php
$meta_keys = get_post_meta( get_the_ID() );
```

## Get the meta for single key for the current post
``` php
$meta_key_value = get_post_meta( get_the_ID(), 'meta_key' );
```

## Add post meta for given post
``` php
add_post_meta( get_the_ID(), 'meta_key', 'meta_value' );
```

## Update post meta field, for given post
``` php
update_post_meta( get_the_ID(), 'meta_key', 'meta_value' );
```