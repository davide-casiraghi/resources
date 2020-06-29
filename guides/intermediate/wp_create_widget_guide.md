---
last_modified_on: "2020-06-24"
title: Create custom widget
description: Create a widget that adds the selected category name to the widget area.
series_position: null
author_github: https://github.com/zkoracin
author_name: Žiga Koračin
tags: ["language: php", "framework: wordpress"]
---

## Extend widget class
The first step for creating your own custom widget is to extend the
[WP Widget class](https://developer.wordpress.org/reference/classes/wp_widget/).<br/>
WP_Widget class has 18 methods, but in this case, we will use only a few of them.
Inside the constructor, we will define base id, name and description of the widget.
``` php
class Agiledrop_Widget extends WP_Widget {
    public function __construct() {
      parent::__construct(
              'agiledrop_widget',
              'Agiledrop Widget',
              array( 'description' => 'Select categories and display theirs title.' )
      );
    }
}
```
## Front-end display
Using a built-in method widget will handle the front-end display of the widget. Add widget function to our class.
We want our widget to display the title which user provided and the names of categories which user selected.
First, we filter the widget title and retrieve all selected categories. The last thing here is to display them.
``` php
/**
* @param array $args     Widget arguments.
* @param array $instance Saved values from database.
*/
public function widget( $args, $instance ) {
    $title = apply_filters( 'widget_title', $instance[ 'title' ] );
    $selected_categories = $instance[ 'selected_categories' ];
    if ( !empty( $selected_categories ) ) {
	    $category_list = explode( ",", $selected_categories );
    }
    echo "<div><h3>" . $title . "</h3></div>";
    if ( !empty( $category_list ) ) {
        foreach ( $category_list as $category ) {
            echo "<div><h4>" . $category . "</h4></div>";
        }
    }
  }
```

## Back-end form
Check the instance for the title and selected categories otherwise set defaults. With functions get_field_id,
get_field_name, we are setting attributes for fields to be saved by the update method.
We retrieve categories with get_categories(). Category name is compared with selected categories in the instance,
so we can add checked status to checkbox if user selected this category.
``` php
/**
* @param array $instance Previously saved values from database.
*/
public function form( $instance ) {
    $title = isset( $instance['title'] ) ? $instance['title'] : 'Categories';
    $instance['selected_categories'] = ! empty( $instance['selected_categories'] )
                                        ? explode(",",$instance['selected_categories'] )
                                        : array();
    ?>
    <p>
        <label for="<?php echo $this->get_field_id( 'title' ); ?>">Title</label>
        <input type="text" id="<?php echo $this->get_field_id( 'title' ); ?>"
               name="<?php echo $this->get_field_name( 'title' ); ?>"
               value="<?php echo $title; ?>"/>
    </p>
    <p>
        <label for="<?php echo $this->get_field_id( 'selected_categories' ); ?>">
        <?php _e( 'Select categories you want to show:' ); ?></label><br /><?php
        $cat_objects = get_categories();
        foreach ( $cat_objects as $category ) {
            $checked = '';
            if ( in_array( $category->name, $instance['selected_categories'] ) ) {
                $checked = "checked='checked'";
            }
            ?>
            <input type="checkbox" id="<?php echo $this->get_field_id('selected_categories' ); ?>"
                   name="<?php echo $this->get_field_name('selected_categories[]'); ?>"
                   value="<?php echo $category->name; ?>"  <?php echo $checked; ?>/>
            <label for="<?php echo $this->get_field_id('selected_categories' ); ?>">
                <?php echo $category->name; ?>
            </label><br />
        <?php } ?>
    </p>
    <?php
    }
```

## Update 
Return instance created from new user inputs.
``` php
/**
* @param array $new_instance Values just sent to be saved.
* @param array $old_instance Previously saved values from database.
* @return array Updated safe values to be saved.
*/
public function update( $new_instance, $old_instance ) {
    $instance = array();
	$instance[ 'title' ] = sanitize_text_field( $new_instance[ 'title' ] );
	$instance[ 'selected_categories' ] = ! empty( $new_instance[ 'selected_categories' ] ) 
                                         ? implode(",",$new_instance[ 'selected_categories' ] ) : 0;
	return $instance;
}
```