---
id: libraries
title: Libraries
---

## Adding Libraries
### In preprocess function or controller function
``` php
$variables['#attached']['library'][] = 'lotus/lotus-js';
```

### In twig template file
``` php
{{ attach_library('hcpl_zen/title-record') }}
```

## Miscellaneous
### Overriding libraries
``` php
// Libraries is an array of the library data.
// Extension is 'core' or the module/theme that defined the libraries.
function hook_library_info_alter(&$libraries, $extension)
```