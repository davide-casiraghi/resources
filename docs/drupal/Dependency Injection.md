---
id: dep_injection 
title: Dependency Injection
---

### services.yml:
``` yaml
services:
  du_user_management:
    class: Drupal\du_user_management\UserManagementService
    arguments: ['@cache.default', '@logger.channel.du_user_management']
  logger.channel.du_user_management:
    class: Drupal\Core\Logger\LoggerChannel
    factory: logger.factory:get
    arguments: ['du_user_management']
```

### Service file
``` php
  /**
   * Constructor.
   *
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache
   *   The cache.
   * @param \Drupal\Core\Logger\LoggerChannelInterface $logger
   *   The logger channel.
   */
  public function __construct(CacheBackendInterface $cache, LoggerChannelInterface $logger) {
    $this->cache = $cache;
    $this->logger = $logger;
  }
```

## Controller or Form

### Controller/Form File
``` php
  /**
   * {@inheritdoc}
   */
  public function __construct(UserManagementService $user_management) {
    $this->userManagement = $user_management;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('du_user_management')
    );
  }
```

## Plugin

### Plugin File
``` php
  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, UserManagementService $client, ConfigFactoryInterface $config_factory) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->client = $client;
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('du_user_management'),
      $container->get('config.factory')
    );
  }
```

### FieldFormatter
``` php
  /**
   * {@inheritDoc}
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings'],
      $container->get('entity_type.manager')
    );
  }
```
