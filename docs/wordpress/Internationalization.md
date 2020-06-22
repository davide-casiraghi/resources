---
id: wp_internationalization
title: Internationalization
---

## Return the translation of its argument
``` php
__( 'Some text', 'textdomain' );
```

## Output the translation of its argument
``` php
_e( 'Some text', 'textdomain' );
```

## Display translation of text with variable
``` php
printf( __( 'Some text %s', 'textdomain' ), $variable );
```

## Store translation of text with variable
``` php
$text = sprintf( 'Some text %s', 'textdomain' ), $variable );
```