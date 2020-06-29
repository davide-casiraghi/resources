---
id: contribute
title: Contribute
description: Guidelines for contributing
---

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.
If you want to test and run the website on your local machine or contribute by adding or editing content you should follow instructions below.

## Website

### Installation

``` shell script
$ git clone git@github.com:AGILEDROP/resources.git
$ cd resources && npm install
```

### Local Development

``` shell script
$ npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

``` shell script
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Content structure

In general we have two main types of pages - snippets and guides. 

Snippets are short parts of code that are often used while developing. They should have a title and a code. You can add a small comment but mostly they should be self-explanatory.

Guides are extended pieces of content and consist of text and code blocks. However, try to keep them as short as possible and only cover one topic inside of a single guide.   

## Snippets

Snippets are located inside of `./docs` folder. They must be part of a category which is determined by the folder structure: `./docs/CATEGORY/file_name.md`.

Sidebar menu, including any new categories, will be automatically generated based on the `./docs` folder structure.

### Adding to existing page
You can simply add or update snippets to existing documents by editing corresponding markdown file inside `./docs/CATEGORY` folder. Add a title describing the snippet and enclose your code with markdown tags.

``` markdown
## Title
### First sub-title
``` code block here ```
### Second sub-title
``` more code block here ``` 
Any additional comments (optional)
``` 

### Adding a new page

**Make sure your new markdown document has a correct header included.**

Snippets header consists of:

- `id`:  used for referencing document inside Docusaurus and creating document slugs for URL. Use snake case when naming
- `title`: this will be the main title shown on new documents page
- `description`: short descriptio shown under the main title; also used as og:description meta tag, so make sure it's something appealing in case of sharing on social networks

Example:
``` markdown
---
id: cool_new_snippets
title: Cool New Snippets
description: Collection of snippets that will be helful when working with cool new stuff.
---
```
If `id` or `title` are missing they will be generated from filename.

Copy file inside `./docs` folder into related category folder (e.g. `./docs/drupal/cool_new_file.md`).

If category doesn't exist yet, create a new folder (use lowercase naming) or leave file in top level `./docs` folder if you want it to be outside any category.

## Guides

### Editing existing guide

Edit markdown file inside `./guides/CATEGORY` folder.

### Creating new guide

**Make sure your new markdown document has a correct header included.**

Guides header consists of:
- `last_modified_on`: Date the document was last modified
- `title`: Main title of guide page
- `description`: short description shown under the main title on guide page; also used as og:description meta tag, so make sure it's something appealing in case of sharing on social networks
- `series_position`: include if guide is a part of series (OPTIONAL)
- `author_github`: link to authors Github profile
- `author_name`: displayed name of author
- `tags`: list of tags, left side of key-value pair denotes tag's type and right side is the category inside that type; read instructions on using tags below!

Example:
``` markdown
---
last_modified_on: "2020-05-01"
title: Beginner Sample Guide
description: Description of Beginner Sample Guide
series_position: null
author_github: https://github.com/MyGithubProfile
author_name: John Doe
tags: ["language: php", "framework: drupal"]
---
```

### Tags

Each guide can have multiple tags added to it. Tags can be custom but we have an agreement that we use following two tags:
- `language`: this is a programming language that the guide refers to (e.g. `php`, `javascript`)
- `framework`: this is a framework that the guide refers to (e.g. Drupal, `symfony`, `angular`)

Tag key and value should be written in lower case. 

If the guide describes working with multiple languages or frameworks, specify them separately (`tags: ["language: php", "language: javascript", "framework: drupal"]`), but try to limit to two of each. 

You can also leave the tags empty if you can't tag the guide properly.

### Categories

If you need to add a new category for guides, create a new folder inside `./guides`, use kebab-case for naming. Displayed category title will be generated from folder name and made human readable (e.g foo-bar => Foo Bar).

Edit `metadata.json`, add a new entry to `guides->categories` list. Under `description` add a short description for category and for `name` use folder name.


## Publishing

If you want to add your changes to the page on resources.agiledrop.com, you should follow instructions below.

First, fork the repository on Github. Click on Fork button in the top-right corner on Github page. This creates a new copy of repository under your Github profile.

After you have your own fork, clone the repository to your machine, create a new branch from `master` and do all the necessary changes.

You have to create a new remote upstream to original repository as well:
``` shell script
$ git remote add upstream https://github.com/AGILEDROP/resources
```

When you're done with your changes, push your local branch to your Github repository. Once you push the changes to your repo, the "Compare & pull request" button will appear in GitHub.

Click it and open a new pull request to `master` branch in base repository and assign it to repository mantainers.

Once your pull request is checked and merged, your changes will be deployed and visible on https://resources.agiledrop.com.
