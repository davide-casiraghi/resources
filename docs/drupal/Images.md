---
id: images
title: Images
---

## Render array for an image style
``` php
$render = [
  '#theme' => 'image_style',
  '#style_name' => 'thumbnail',
  '#uri' => 'public://my-image.png',
];
```

## Image style, get URL (full URL including http://)
``` php
$style = \Drupal::entityTypeManager()->getStorage('image_style')->load('thumbnail');
$image_url = $style->buildUrl('public://du_content_gallery-article.jpg');
```

## Image style, get URI (public://path-to-image-style)
``` php
$style = ImageStyle::load('thumbnail');
$image_url = $style->buildUri('public://du_content_gallery-article.jpg');
```