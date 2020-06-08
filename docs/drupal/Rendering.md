---
id: rendering
title: Rendering
---

## Render an entity.
``` php
$nid = 1;
$entity_type = 'node';
$view_mode = 'teaser';
$view_builder = \Drupal::entityTypeManager()->getViewBuilder($entity_type);
$storage = \Drupal::entityTypeManager()->getStorage($entity_type);
$node = $storage->load($nid);
$build = $view_builder->view($node, $view_mode);
$output = render($build);
```

## Render a field.
``` php
$view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
$storage = \Drupal::entityTypeManager()->getStorage('node');
$nid = 1;
$node = $storage->load($nid);
$view = $view_builder->viewField($node->get('body'), [
  'type' => 'string', // string, entity_reference_label
  'label' => 'hidden',
  'settings' => ['link' => FALSE],
]);
$output = render($view);
```