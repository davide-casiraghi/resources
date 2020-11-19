---
id: db_stuff
title: Database
description: Collection of database related code snippets for Drupal 8. 
---

## Simple database query
``` php
$results = \Drupal::database()->query('select * from users')->fetchAll();
```

## Debugging an entity query, enable the devel module and add tag before execute

``` php
$entity_query->addTag('debug')->execute();
```

## Delete all 'event' nodes

``` php
$result = \Drupal::entityQuery('node')
  ->condition('type', 'event')
  ->execute();
entity_delete_multiple('node', $result);
// Add ->range(0, 10) to delete a range
```

## Insert statement

``` php
$query = \Drupal::database()->insert('purge_queue');
$query->fields(['data', 'created']);
$query->values(['a:4:{i:0;s:3:"url";i:1;a:4:{s:10:"66849f6f11";i:3;s:10:"c990b129a0";i:3;s:10:"c618828456";i:3;s:10:"453d844ea2";i:3;}i:2;s:66:"http://www.example.com";i:3;a:0:{}}', time()]);
$query->execute();
```

## Update statement

``` php
$query = \Drupal::database()->update('node');
$query->fields(['langcode' => 'fr']);
$query->condition('nid', 1);
$query->execute();
```

## Delete statement

``` php
$query = \Drupal::database()->delete('cachetags');
$query->condition('tag', '%block%', 'LIKE');
$query->execute();
```

## Select a node that has specific set of entity references
Select all nodes that have **at least** terms with id 2 and 8 referenced on
field_terms. You need to add a separate andConditionGroup for each term.

``` php
$query = \Drupal::entityQuery('node')
  ->condition('status', NODE_PUBLISHED)
$and = $query->andConditionGroup();
$and->condition('field_terms', 2);
$query->condition($and);
$and = $query->andConditionGroup();
$and->condition('field_terms', 8);
$query->condition($and);
$result = $query->execute();
```
