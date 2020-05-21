---
id: debugging
title: Debugging
---

Debugging code snippets

## Debug backtrace any error.
```
// This function exists in core/includes/bootstrap.inc.
// Just need to add lines 6-8 to it.
function _drupal_error_handler($error_level, $message, $filename, $line, $context) {
  require_once DRUPAL_ROOT . '/includes/errors.inc';
  require_once DRUPAL_ROOT . '/modules/contrib/devel/kint/kint.module';
  $d = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
  ksm($message, $d);
  _drupal_error_handler_real($error_level, $message, $filename, $line, $context);
}
```

## Debugging search API solr queries:
```
// You can output the Request object using kint/kpm, but it can be hard
// to figure out where to set the debugging code. The best place is in
// the executeRequest function in the following file:
// search_api_solr/src/SolrConnector/SolrConnectorPluginBase.php
```

## Starting point for debugging ElasticSearch stuff, in the file
```
// src/ElasticSearch/Parameters/Builder/SearchBuilder.php:
// Add ksm at the end of build() and getSearchQueryOptions()
```