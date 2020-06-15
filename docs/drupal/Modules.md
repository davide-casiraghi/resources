---
id: modules
title: Modules
---
## Get module path
``` php
$module_handler = \Drupal::service('module_handler');
$module_path = $module_handler->getModule('my_module')->getPath();
```
## Module exists
``` php
$module_handler = \Drupal::service('module_handler');
if ($module_handler->moduleExists('my_module')) {
    // Add your code here...
 };
```
## Get all active modules
``` php
$module_handler = \Drupal::service('module_handler');
$module_list = $module_handler->getModuleList();
```
## Human readable module name
``` php
$module_handler = \Drupal::service('module_handler');
$module_name = $module_handler->getModule('my_module')->getName();
```

## Installing and uninstalling modules
``` php
\Drupal::service('module_installer')->install(['module_name']);
\Drupal::service('module_installer')->uninstall(['module_name']);
```