---
id: users
title: Users
---

## Users
### Load a user.
```
$node = \Drupal::entityTypeManager()->getStorage('user')->load(23);
```

### Get current user.
```
$account = \Drupal::currentUser();
```

### Get current user ID.
```
$account = \Drupal::currentUser()->id();
```