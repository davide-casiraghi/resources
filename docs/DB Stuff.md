---
id: db_stuff
title: DB Stuff
---

Database related code snippets

## Simple database query.

```
$results = \Drupal::database()->query('select * from purge_queue')->fetchAll();
```

## Debugging an entity query, enable the devel module and add tag before execute.

```
$entity_query->addTag('debug')->execute();
```

## Delete all 'event' nodes.

```
$result = \Drupal::entityQuery('node')
  ->condition('type', 'event')
  ->execute();
entity_delete_multiple('node', $result);
// Add ->range(0, 10) to delete a range
```

## Insert statement.

```
$query = \Drupal::database()->insert('purge_queue');
$query->fields(['data', 'created']);
$query->values(['a:4:{i:0;s:3:"url";i:1;a:4:{s:10:"66849f6f11";i:3;s:10:"c990b129a0";i:3;s:10:"c618828456";i:3;s:10:"453d844ea2";i:3;}i:2;s:66:"http://www.example.com";i:3;a:0:{}}', time()]);
$query->execute();
```

## Update statement.

```
$query = \Drupal::database()->update('mcpl_events_feeds_item');
$query->fields(['hash' => 'update']);
$query->condition('nid', 1);
$query->execute();
```

## Delete statement.

```
$query = \Drupal::database()->delete('purge_queue');
$query->condition('data', '%url%', 'LIKE');
$query->execute();
```