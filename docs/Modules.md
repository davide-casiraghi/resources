---
id: modules
title: Modules
---

## Installing and uninstalling modules.
``` php
\Drupal::service('module_installer')->install(['media']);
\Drupal::service('module_installer')->uninstall(['media']);
```