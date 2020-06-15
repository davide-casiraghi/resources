---
id: multilingual
title: Multilingual
---
## Get current language id
``` php
\Drupal::languageManager()->getCurrentLanguage()->getId();
```

## Add t() to classes (services, controllers, etc)
``` php
use Drupal\Core\StringTranslation\StringTranslationTrait;
class MyClass {
  use StringTranslationTrait;
}
```
## Entity translations
### Get translation
``` php
$node = \Drupal::entityTypeManager()->getStorage('node')->load(23);
  if ($node->hasTranslation($languageId)) {
    $translated = $node->getTranslation($languageId);
  }
```
### Add translation
``` php
if (!$entity->hasTranslation('fr')) {
      $translation = $entity->addTranslation('fr', [
        'field_foo' => 'Bonjour'
      ]);
    }
```
