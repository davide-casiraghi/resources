---
last_modified_on: "2020-06-19"
title: Post update hook and batch processing
description: Update node titles in batch with hook_post_update.
series_position: null
author_github: https://github.com/kbrodej
author_name: Klemen Brodej

tags: ["type: howto", "domain: hooks"]
---

Executes an update which is intended to update data, like entities.

> *These updates are executed after all hook_update_N() implementations. At this stage Drupal is already fully repaired so you can use any API as you wish.*

## Updating node titles with post update hook

In this example we will take a look on how to update title of an existing nodes with post update hook in batches.

We will start by creating .post_update.php file inside our module root folder.
Inside we will place our post_update hook function and replace `NAME` with an arbitrary machine name.
> Alphanumeric order of the NAME ensures the executing order of update.
>  If update order is mandatory, you should add numerical prefix to `NAME` or make it completely numerical.

### Post_update file
File: .../your_module/your_module.post_update.php

```php
/**
 * Implements hook_post_update_NAME().
 */
function your_module_post_update_01_update_node_titles(&$sandbox) {
   // Code goes here.
}
```

### "Setup"

First we need to gather all nodes that we want to update. In this example all nodes of type `event`.

To use batches we need to set the total number of nodes and current count of node which will be incremented for each processed node.
```php
$entity_type_manager = \Drupal::entityTypeManager();
$query = $entity_type_manager->getStorage('node')->getQuery();
 if (!isset($sandbox['total'])) {
    $nids = $query->condition('type', 'event')->execute();
    $sandbox['total'] = count($nids);
    $sandbox['current'] = 0;
  }
```

### Gathering data
Next we need to set the limit for 1 batch and gather nodes for our batch. In this case we can use query range.
> *In this example we are using simple service which takes the string and returns it in title case.*
```php
  $nodes_per_batch = 25;
  $set_title_service = \Drupal::service('set_title');

  $nids = $query->condition('type', 'event')
    ->range($sandbox['current'], $sandbox['current'] + $nodes_per_batch)
    ->execute();
```

### Processing data
After we have our data set for one batch, we process it.
It is important to increment ```$sandbox['current']``` as this will be the starting value for next batches query range.
```php
  foreach ($nids as $nid) {
    $event = Node::load($nid);
    $event->setTitle($set_title_service->toTitleCase($event->getTitle()));
    $event->save();
    $sandbox['current']++;
  }
```
### Finishing the operation
To end our batch operation when all nodes are processed we need to set ```$sandbox['#finished'] = 1```
> *you can set $sandbox['#finished'] to a value between 0 and 1 to indicate the percent completed.*
```php
  $sandbox['#finished'] = ($sandbox['current'] / $sandbox['total']);
```
### Alternatives
As an alternative of using query range to gather data it can be gathered in the "setup".

> Note: It is important to gather data, for example reading from file **inside IF statement** as this part of the code is run only once and **not** once per batch.
```php
if (!isset($sandbox['total'])) {
  $sandbox['progress'] = 0;
  // Your code for gathering data goes here.
  $sandbox['lines'] = my_data_function();

  $sandbox['total'] = count($sandbox['lines']);
}
```
and then process it in batches
```php
  $items_per_batch = 25;
  $counter = 0;
  foreach ($sandbox['lines'] as $id => $data) {
    if ($counter === $items_per_batch) {
      break;
    }
    // Your code goes here.

    $i++;
    $sandbox['progress']++;
    unset($sandbox['lines'][$id]);
  }
```


##### Whole code
```php
/**
 * Implements hook_post_update_NAME().
 */
function your_module_post_update_01_update_node_titles(&$sandbox) {
   $entity_type_manager = \Drupal::entityTypeManager();
   $query = $entity_type_manager->getStorage('node')->getQuery();
   if (!isset($sandbox['total'])) {
       $nids = $query->condition('type', 'event')->execute();
       $sandbox['total'] = count($nids);
       $sandbox['current'] = 0;
   }

  $nodes_per_batch = 25;
  $set_title_service = \Drupal::service('set_title');

  $nids = $query->condition('type', 'event')
    ->range($sandbox['current'], $sandbox['current'] + $nodes_per_batch)
    ->execute();

  foreach ($nids as $nid) {
    $event = Node::load($nid);
    $event->setTitle($set_title_service->toTitleCase($event->getTitle()));
    $event->save();
    $sandbox['current']++;
  }
  
   $sandbox['#finished'] = ($sandbox['current'] / $sandbox['total']);

}
```
#### *Usefull links*
 - [Drupal API - hook_post_update_NAME](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_post_update_NAME/8.8.x)
 - [Drupal API - Batch operations](https://api.drupal.org/api/drupal/core%21includes%21form.inc/group/batch/8.8.x)