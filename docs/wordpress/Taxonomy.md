---
id: wp_taxonomy
title: Taxonomy
---

## Get category ID
``` php
$category_id = get_cat_ID( 'category name' );
```

## Get top-level categories
``` php
$top_categories = get_categories( array( 'parent' => 0 ) );
```

## Register taxonomy for cpt, with corresponding slug for cpt
``` php
register_taxonomy( 'jobs', 'agiledrop', array( 'rewrite' => array( 'slug' => 'agiledrop/jobs' ) ) );
```

## Check if term exists
``` php
‌‌term_exists( 'uncategorized' );
```