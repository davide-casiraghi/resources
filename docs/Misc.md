---
id: misc
title: Miscellaneous
---

## Miscellaneous
### Get the node from the current path.
``` php
$node = \Drupal::routeMatch()->getParameter('node');
```

### Get current path.
``` php
$path = \Drupal::service('path.current')->getPath();
```

### Get path arguments (from path above).
``` php
$path_args = explode('/', $path);
```

### Get the current route.
``` php
$route_name = \Drupal::service('current_route_match')->getRouteName();
```

### Get the query parameter from a GET request.
``` php
$name = \Drupal::request()->query->get('name');
```

### Get the parameter from a POST request.
``` php
$name = \Drupal::request()->request->get('name');
```

### Get the host (ex: www.google.com).
``` php
$host = \Drupal::request()->getHost();
```

### Redirect.
``` php
use Symfony\Component\HttpFoundation\RedirectResponse;
new RedirectResponse(\Drupal::url($route_name));
```

### Add t() to classes (services, controllers, etc)
``` php
use Drupal\Core\StringTranslation\StringTranslationTrait;
class MyClass {
  use StringTranslationTrait;
}
```