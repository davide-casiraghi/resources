---
id: search
title: Search
---

## Trigger select entities to be re-indexed through the Search API.
``` php
// This is for Title Record entities, but any entity will do.
use Drupal\search_api\Plugin\search_api\datasource\ContentEntity;
use Drupal\omega_hub\Entity\TitleRecord;
$entity_ids = [507863, 509240, 513703, 515100, 536124, 537058, 541569];
$combine_id = function ($entity_id) {
  return $entity_id . ':und';
};
$update_ids = array_map($combine_id, $entity_ids);
$entity = TitleRecord::load(507863);
$indexes = ContentEntity::getIndexesForEntity($entity);
foreach ($indexes as $index) {
  $index->trackItemsUpdated('entity:title_record', $update_ids);
}
```