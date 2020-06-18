---
id: wp_input_validation
title: Input validation
---

## Strip all tags for email field
``` php
$email = sanitize_email( 'info@info.si' );
```

## Email verification
``` php
$valid_email = is_email( 'info@info.si' );
```

## Sanitize string from input
``` php
$string_input = sanitize_text_field( 'text to sanitize' );
```

## Sanitize multi-line string from input
``` php
$textarea_input = sanitize_textarea_field( 'multi-line text to sanitize' );
```

## Create nonce
``` php
wp_nonce_field( 'agiledrop_action', 'agiledrop_nonce_field' );
```
## Verify nonce
``` php
wp_verify_nonce( $_POST['agiledrop_nonce_field'], 'agiledrop_action' );
```