---
id: entities
title: Entities
---

## Load an entity. Can be a config entity also.
``` php
$node = \Drupal::entityTypeManager()->getStorage('node')->load(23);
$search_api_index = \Drupal::entityTypeManager()->getStorage('search_api')->load('title_records');
```

## Load multiple entities (if no param is passed, all entities are loaded).
``` php
$node = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($entity_ids);
```

## Delete multiple entities.
``` php
$result = \Drupal::entityQuery('taxonomy_term')
      ->condition('vid', 'libraries')
      ->execute();
entity_delete_multiple('taxonomy_term', $result);
```

## Adding a new field to a custom entity.
``` php
$new_field = BaseFieldDefinition::create('string')
  ->setLabel(new TranslatableMarkup('New Field'))
  ->setDescription(new TranslatableMarkup('New field description.'));
\Drupal::entityDefinitionUpdateManager()->installFieldStorageDefinition('<field_name>', '<entity_type_id>', '<provider>', $new_field);
```

## Apply all updates to entities.
``` php
\Drupal::entityDefinitionUpdateManager()->applyUpdates();
```

## Get bundle field definitions
``` php
\Drupal::service('entity_field.manager')->getFieldDefinitions($entity_type, $bundle_id);
```
