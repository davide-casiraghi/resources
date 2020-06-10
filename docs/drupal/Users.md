---
id: users
title: Users
---

## Load a user.
``` php
$node = \Drupal::entityTypeManager()->getStorage('user')->load(23);
```

## Get current user.
``` php
$account = \Drupal::currentUser();
```

## Get current user ID.
``` php
$account = \Drupal::currentUser()->id();
```
## Get user roles
``` php
$user = \Drupal::entityTypeManager()->getStorage('user')->load(23);
$role = $user->getRoles();
```
