---
id: modules
title: Modules
---

## Modules
### Installing and uninstalling modules.
```
\Drupal::service('module_installer')->install(['media']);
\Drupal::service('module_installer')->uninstall(['media']);
```