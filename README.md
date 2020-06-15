This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.
Following instructions are aplicable if you want to test and run the website on your local machine.

## Website

### Installation

```
$ git clone git@github.com:AGILEDROP/resources.git
$ cd resources && npm install
```

### Local Development

```
$ npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
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
``` 
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

- `id`:  used for referencing document inside Docusaurus and creating document slugs for URL. Use snake case when naming.
- `title`: this will be the main title shown on new documents page.

Example:
```
---
id: cool_new_snippets
title: Cool New Snippets
---
```
If any field is missing it will be auto-generated from filename.

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
- `description`: short description shown under the main title on guide page
- `series_position`: Include if guide is a part of series (OPTIONAL)
- `author_github`: Link to authors Github profile
- `tags`: List of tags, left side of key-value pair denotes tag's type and right side is the category inside that type

Example:
```
---
last_modified_on: "2020-05-01"
title: Beginner Sample Guide \#3
description: Description of Beginner Sample Guide \#3
series_position: null
author_github: https://github.com/MyGithubProfile
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

### Author data in metadata.json

**Make sure that author object with same `github` link as provided in `author_github` exists in list inside `./metadata.json` file under `team` field.**

If not, add a new author object to the list:

- `avatar`: Link to authors github profile picture. Adding `.png` at end of your profile link works.
- `bio`: Short bio of author (OPTIONAL - currently disabled on frontend)
- `github`: Link to authors github profile
- `id`: Short ID string for author, used internally
- `name`: Displayed name of author

Example:
```
{
    "team": [
        { ... },
        { ... },
        {
            "avatar": "https://github.com/NewGuy.png",
            "bio": "Example bio with <a href=\"https://google.com\">Links</a>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt facilisis eros, et egestas risus pellentesque et",
            "github": "https://github.com/NewGuy",
            "id": "new_guy",
            "name": "New Guy"
        },
    ]
}
```

## Publishing

Push your local branch with new/edited documents on Github repository.

Open a Pull Request to `master` branch and assign it to repo mantainers.

Once your PR is checked and merged, new website will be deployed by site administrator.
