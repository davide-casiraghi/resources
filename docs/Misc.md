---
id: misc
title: Miscellaneous
---

## Miscellaneous
### Get the node from the current path.
```
$node = \Drupal::routeMatch()->getParameter('node');
```

### Get current path.
```
$path = \Drupal::service('path.current')->getPath();
```

### Get path arguments (from path above).
```
$path_args = explode('/', $path);
```

### Get the current route.
```
$route_name = \Drupal::service('current_route_match')->getRouteName();
```

### Get the query parameter from a GET request.
```
$name = \Drupal::request()->query->get('name');
```

### Get the parameter from a POST request.
```
$name = \Drupal::request()->request->get('name');
```

### Get the host (ex: www.google.com).
```
$host = \Drupal::request()->getHost();
```

### Redirect.
```
use Symfony\Component\HttpFoundation\RedirectResponse;
new RedirectResponse(\Drupal::url($route_name));
```

### Add t() to classes (services, controllers, etc)
```
use Drupal\Core\StringTranslation\StringTranslationTrait;
class MyClass {
  use StringTranslationTrait;
}
```