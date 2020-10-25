---
last_modified_on: "2020-24-10"
id: before_go_live
title: Before go live
description: The purpose of the list is to provide the tasks which needs to be executed before website go live
series_position: null
author_github: https://github.com/alesbencina
author_name: Ales Bencina
tags: ["language: php", "framework: drupal"]
---

## Check deploy for errors / warnings
- Search for any error / warning in the output in site status report,
- Is config-split / ignore correctly set-up for live-environment?
    - check if the the keys are correct for live env (GTM, GA, Google maps, other APIs)
    - dev modules disabled in live configuration split
    - Ignored_config_entities should contain stuff like: 
      - 'webform.*'
      - 'system.action.webform_*'
      - 'collections.language.*'
      - google_analytics.settings	
      - google_tag.settings


## Are all security updates / patches installed?
- go to /admin/modules/update
  - check for available updates for for security updates or unsupported releases
  - if updates can’t be done due to conflicts or requirements, then security fixes should be applied as patches

## Composer related
- Is the composer.json file up-to-date? 
- Are all patches still applying?
- run composer update nothing --no-dev command
   - all patches still apply correctly
   - dev dependencies are not installed / committed

## SEO
- Check if hreflangs are set (https://support.google.com/webmasters/answer/189077?hl=en)
``` php
<link ... hreflang="<langcode>" href="..." /> ;
```
- the langcode changes when switching languages on the same page
- check if homepage, 403 and 404 and other landing pages have translations for all the available languages.
- Site email to be relevant
- Email address to be relevant
- check page sizes on homepage and other main pages and spot large files being downloaded (https://gtmetrix.com/)
- All image fields have a max-resolution configured?
  - check all image fields
- Alt & title configured on every image field?
- check if Redirect module is available and installed
- Path pattern configured for each entity detail?
    - Check all entities which have a canonical URL / detail page (node, terms): visit and see if styled, otherwise should probably be 404-ed.
        - /en/admin/config/search/path/patterns
- Rabbit-hole correctly configured? Non-accessible entities should be a 404.
- Check all entities which have a canonical URL / detail page (node, terms)
  - access the Manage fields page of CT’s which are accessible via canonical URL
  - check if there is a metatag field
- Is XML Sitemap installed and properly configured?
 - check if Simple XML Sitemap module is available and installed
 - check if simple_sitemap.settings is ignored - /en/admin/config/development/configuration/ignore
 - Default base URL to use final domain
 - regenerate sitemap and check /sitemap.xml
 - If site has >2000 pages, check limit and if sitemap is split into smaller chunks
- Are redirects imported from the old site to the new site?
  - Try to access old paths on the new site, they should redirect to a migrated / relevant page.
- robots.txt enabled and commited? and added to live?
    - make sure that staging and dev block crawlers

## Permissions
- Webadmin-role is present and webadmin-user is added 
- Are all permissions correctly configured? 
- editor role should be able to CRUD all kind of content
- webadmin role should be able to configure keys that are ignored (GA, GTM, reCaptcha, etc)

## Codebase
- Is no debug-code committed? Check logs and console
 - check for dpm,dpq,kint,print_r,console.log in codebase
- check if PHP code is standardized and using good practices
 - https://www.drupal.org/docs/develop/standards/coding-standards
 - use of codesniffer
     
## General
- check if CAPTCHA and reCAPTCHA modules are available and installed
    - check if Site key and Secret key are configured
    - Client has live-url added to his/her reCaptcha config
- Drupal cache, Varnish and memcache properly configured (on dev & staging environments too)?
    - check settings.php files for correct config
    - check cache hit with curl
    - create/edit/delete content, check as anonymous
 - is Varnish setup correctly?
    - Edit content as editor and check as an anonymous user if it is reflected on the client side.
- Check load times of the pages and elements on the pages
    - Usually, pages should load in less than 2 seconds.
- Check site with Google PageSpeed / LightHouse.
    - https://developers.google.com/speed/pagespeed/insights
- Is all test data (nodes / terms / users) removed?
- Are all webforms updated with correct email values?
    - check all the webform email handlers for valid addresses.
- install Reroute emails module
    - enable rerouting and set your own email address
    test the webform’s notifications
- If Google Maps is used on site, does it appear properly? Is Google Maps API key properly set?
- Check for broken links on the site.
  - https://peacockmedia.software/mac/integrity/free.html (Mac)
  - https://www.screamingfrog.co.uk/seo-spider/
  - https://wummel.github.io/linkchecker/
- Solr is properly configured
    - there are any Solr servers and if they are accessible
    - content can be deleted / reindexed in Solr based indexes.
- Cross-browser check
    - https://live.browserstack.com to check main pages in different browsers and on mobile
- Decent styling of the Login page
- Favicon added?
- Compile theme with 'gulp prod' ( to disable source-maps )
- Are emails correctly received when sent out by the site?
   - (when on final domain, SPF records are ok?)
   - open email received from the (live) site
   - click on more options (3 dots) and choose Show original
   - check SPF header is Pass (not Fail or Soft-Fail)
- Is this project using a supported PHP version?
- All t strings in English
- All machine names in English
