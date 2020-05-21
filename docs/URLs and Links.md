---
id: urls
title: URLs and Links
---

## URLS
### URL from route.
```
use Drupal\Core\Url;
$url = Url::fromRoute($route_name, $params);
```

### URL from URI.
```
use Drupal\Core\Url;
$url = Url::fromUri('internal:/mypath/to/style.css');
```

### Add options to an existing URL (classes, target, etc).
```
$url->setOptions([
  'attributes' => [
    'target' => '_blank',
  ],
]);
```

## Links
### Generate a link.
```
$my_link = \Drupal::service('link_generator')->generate($text, Url $url);
```
OR
```
use Drupal\Core\Link;
$renderable_link = Link::fromTextAndUrl($text, Url $url);
```

### Create a link from route (skip having to use Url class).
```
Link::createFromRoute($text, $route_name, ['arg1' => 'value'], ['attributes' => ['class' => 'use-ajax']]);
```

### Convert above link to render array or link string.
```
$link_render_array = $renderable_link->toRenderable();
$link_string = $renderable_link->toString();
```