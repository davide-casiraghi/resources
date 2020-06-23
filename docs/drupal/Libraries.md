---
id: libraries
title: Libraries
---

## Adding libraries
### In preprocess function
``` php
$variables['#attached']['library'][] = 'bartik/library-name';
```

### In twig template file
``` php
{{ attach_library('bartik/library-name') }}
```

## Overriding libraries
### In php with hook
``` php
// $libraries: array of the library data.
// $extension: 'core' or the name of the module/theme that defined the libraries.
function hook_library_info_alter(&$libraries, $extension)
```

### In *.info.yml file
``` yaml
libraries-override:
  # Replace an entire library.
  core/drupal.collapse: mytheme/collapse

  # Replace an asset with another.
  subtheme/library:
    css:
      theme:
        css/layout.css: css/my-layout.css
    
  # Remove an asset.
  drupal/dialog:
    css:
      theme:
        dialog.theme.css: false
    
  # Remove an entire library.
  core/modernizr: false
```

## Extending libraries
``` yaml
# Extend drupal.user: from core.libraries.yml and add assets to 
# mytheme (mytheme.libraries.yml) user-login library
libraries-extend:
  core/drupal.user: 
    - mytheme/user-login
```
