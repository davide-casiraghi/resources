---
id: libraries
title: Libraries
---

## Adding Libraries
### In preprocess function or controller function.
```
$variables['#attached']['library'][] = 'lotus/lotus-js';
```

### In twig template file.
```
{{ attach_library('hcpl_zen/title-record') }}
```

## Miscellaneous
### Overriding libraries
```
// Libraries is an array of the library data.
// Extension is 'core' or the module/theme that defined the libraries.
function hook_library_info_alter(&$libraries, $extension)
```