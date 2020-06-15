---
id: urls
title: URLs, links and routing
---

## URLS
### URL from route
``` php
use Drupal\Core\Url;
$url = Url::fromRoute($route_name, $params);
```

### URL from URI
``` php
use Drupal\Core\Url;
$url = Url::fromUri('internal:/mypath/to/style.css');
```

### Add options to an existing URL (classes, target, etc)
``` php
$url->setOptions([
  'attributes' => [
    'target' => '_blank',
  ],
]);
```

## Links
### Generate a link
``` php
$my_link = \Drupal::service('link_generator')->generate($text, Url $url);
```
OR
``` php
use Drupal\Core\Link;
$renderable_link = Link::fromTextAndUrl($text, Url $url);
```

### Create a link from route (skip having to use Url class)
``` php
Link::createFromRoute($text, $route_name, ['arg1' => 'value'], ['attributes' => ['class' => 'use-ajax']]);
```

### Convert above link to render array or link string
``` php
$link_render_array = $renderable_link->toRenderable();
$link_string = $renderable_link->toString();
```

## Paths
### Get the node from the current path
``` php
$node = \Drupal::routeMatch()->getParameter('node');
```

### Get current path
``` php
$path = \Drupal::service('path.current')->getPath();
```

### Get path arguments (from path above)
``` php
$path_args = explode('/', $path);
```
### Get the current route
``` php
$route_name = \Drupal::service('current_route_match')->getRouteName();
```

## Requests
### Get the query parameter from a GET request
``` php
$name = \Drupal::request()->query->get('name');
```

### Get the parameter from a POST request
``` php
$name = \Drupal::request()->request->get('name');
```

### Get the host (ex: www.google.com)
``` php
$host = \Drupal::request()->getHost();
```

## Redirect
``` php
use Symfony\Component\HttpFoundation\RedirectResponse;
new RedirectResponse(\Drupal::url($route_name));
```