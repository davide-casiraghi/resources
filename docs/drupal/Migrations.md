---
id: migrations 
title: Migrations
---

## Run an update migration
``` php
// Remove the prepareUpdate() section if you just want a normal import.
// To rollback just change 'import' to 'rollback'.
$migration = \Drupal::service('plugin.manager.migration')->createInstance('machine_name');
$migration->getIdMap()->prepareUpdate();
$executable = new \Drupal\migrate_tools\MigrateExecutable($migration, new \Drupal\migrate\MigrateMessage());
$executable->import();

// MigrateExecutable takes an optional third argument where you can provide options including
// limit to limit the number of migrations to perform, and idlist to only migrate certain source
// IDs.
// Example: ['limit' => 10, 'idlist' => '1,2,3']
```

## Interrupt a migration (stop it)
``` php
$migration = \Drupal::service('plugin.manager.migration')->createInstance('machine_name');
$migration->interruptMigration(\Drupal\migrate\Plugin\MigrationInterface::RESULT_STOPPED);
```

## Set a migration status to Idle
``` php
$migration = \Drupal::service('plugin.manager.migration')->createInstance('machine_name');
$migration->setStatus(\Drupal\migrate\Plugin\MigrationInterface::STATUS_IDLE);
```

## Run a migration on page load (w/?start-migration appended) for xdebug walkthrough
``` php
use Drupal\migrate\MigrateExecutable;
use Drupal\migrate\MigrateMessage;

/**
 * Implements hook_preprocess_page().
 */
function example_module_preprocess_page(&$vars) {
  if ($qs = \Drupal::requestStack()->getCurrentRequest()->getQueryString()) {
   if (strpos($qs, 'start-migration') !== FALSE) {
      $migration_id = 'your_migration_id';
      $migration = \Drupal::service('plugin.manager.migration')->createInstance($migration_id);
      $executable = new MigrateExecutable($migration, new MigrateMessage());
      $executable->import();
    }
  }
}
```