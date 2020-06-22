---
id: wp_rest_api
title: Rest Api
---

## Register REST API route
``` php
register_rest_route( 'agiledrop/v1', '/custom-post-types/', array(
				'methods'   => 'GET',
				'callback'  => function() { return 'something' }
			) );
```