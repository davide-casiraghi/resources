---
last_modified_on: "2020-06-19"
title: Update hook and batch processing
description: Using update hook with batch processing.
series_position: null
author_github: https://github.com/kbrodej
author_name: Klemen Brodej

tags: ["type: howto", "domain: operations"]
---

*Update hook provides update to stored data whenever your module makes a change to its data model in its life cycle*.


# Updating node titles with update hook

In this example we will take a look on how to update title of an existing nodes with update hook in batches.


We will start by creating .install file inside our module root folder.
Inside we will place our update hook function and replace the N with params that follow:
```text
1 digit for Drupal core compatibility (8).
1 digit for your module's major release version. 
    For instance, if you're developing for Drupal Core and its version 8.0.x, use 0, and if its version 8.1.x, use 1, etc. 
    If you're in a contributed or custom module, and its version 8.x-1.x, use 1, etc.
2 digits for sequential counting, starting with 01. 
    (Note: starting at 01 is required. Starting at 00 can cause system schema corruption.)
```

## Install file
File: .../your_module/your_module.install

```php
/**
 * Implements hook_update_8001().
 */
function your_module_update_8001(&$sandbox) {
 // Code goes here
}
```

## "Setup"

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

## Gathering data
Next we need to set the limit for 1 batch.
Now we need to gather nodes for our batch. In this case we can use query range.
> In this example we are using simple service which takes the string and returns it in title case.
```php
  $nodes_per_batch = 25;
  $set_title = Drupal::service('set_title');

  $nids = $query->condition('type', 'event')
    ->range($sandbox['current'], $sandbox['current'] + $nodes_per_batch)
    ->execute();
```

## Processing data
After we have our data set for one batch, we process it.
It is important to increment ```$sandbox['current']``` as this will be the starting value for next batches query range.
```php
  foreach ($nids as $nid) {
    $event = Node::load($nid);
    $set_title->setTitleString($event->get('title')->value);
    $event->setTitle($set_title->getTitleCase());
    $event->save();
    $sandbox['current']++;
  }
```
## Finishing the operation
To end our batch operation when all nodes are processed we need to set ```$sandbox['#finished'] = 1```
```php
  $sandbox['#finished'] = ($sandbox['current'] / $sandbox['total']);
```
## Alternatives
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
 * Implements hook_update_N().
 */
function your_module_update_8001(&$sandbox) {
$entity_type_manager = \Drupal::entityTypeManager();
$query = $entity_type_manager->getStorage('node')->getQuery();
 if (!isset($sandbox['total'])) {
    $nids = $query->condition('type', 'event')->execute();
    $sandbox['total'] = count($nids);
    $sandbox['current'] = 0;
  }

  $nodes_per_batch = 25;
  $set_title = Drupal::service('set_title');

  $nids = $query->condition('type', 'event')
    ->range($sandbox['current'], $sandbox['current'] + $nodes_per_batch)
    ->execute();

  foreach ($nids as $nid) {
    $event = Node::load($nid);
    $set_title->setTitleString($event->get('title')->value);
    $event->setTitle($set_title->getTitleCase());
    $event->save();
    $sandbox['current']++;
  }


  $sandbox['#finished'] = ($sandbox['current'] / $sandbox['total']);

}

```