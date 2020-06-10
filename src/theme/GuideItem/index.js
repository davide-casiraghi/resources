import React from 'react';

import Avatar from '@site/src/components/Avatar';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import {MDXProvider} from '@mdx-js/react';
import SVG from 'react-inlinesvg';
import Tags from '@site/src/components/Tags';

import classnames from 'classnames';
import dateFormat from 'dateformat';
import {enrichTags} from '@site/src/exports/tags';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import './styles.css';

function GuideItem(props) {
  const {
    frontMatter,
    metadata,
    isGuidePage = false,
  } = props;


  const {categories, description, permalink, readingTime, seriesPosition, tags} = metadata;
  const {author_github, cover_label: coverLabel, last_modified_on: lastModifiedOn, title} = frontMatter;
  const enrichedTags = enrichTags(tags, 'guides');
  const domainTag = enrichedTags.find(tag => tag.category == 'domain');
  const domainBG = domainTag ? domainTag.value : 'default';
  const platformTag = enrichedTags.find(tag => tag.category == 'platform');
  const platformName = platformTag ? platformTag.value : null;
  const sourceTag = enrichedTags.find(tag => tag.category == 'source');
  const sourceName = sourceTag ? sourceTag.value : null;
  const sinkTag = enrichedTags.find(tag => tag.category == 'sink');
  const sinkName = sinkTag ? sinkTag.value : null;

  const {siteConfig} = useDocusaurusContext();
  // const {metadata: {installation, sources, sinks}} = siteConfig.customFields;
  // const {platforms} = installation;
  // const platform = platformName && platforms[platformName];
  // const source = sourceName && sources[sourceName];
  // const sink = sinkName && sinks[sinkName];
  const sourceIcon = false;
  const sinkIcon = false;

  let sourceLogoPath = null;

  // if (platform) {
  //   sourceLogoPath = platform.logo_path;
  // } else if (source) {
  //   sourceLogoPath = source.logo_path;
  // }

  let sinkLogoPath = null;

  // if (sink) {
  //   sinkLogoPath = sink.logo_path;
  // }

  return (
    <Link to={permalink + '/'} className={`guide-item`}>
      <article>
        <div className={`guide-item__inner domain-bg domain-bg--${domainBG} domain-bg--hover`}>
          <header>
            <div className="guide-item__category category">{categories[0].name}</div>
            <h3 className="guide-item__title" title={title}>{seriesPosition && (seriesPosition + '. ')}{coverLabel || title}</h3>
          </header>
          <footer>
            {sourceLogoPath && <SVG src={sourceLogoPath} className="logo" />}
            {!sourceLogoPath && sourceIcon && <div className="logo"><i className="feather icon-server" /></div>}
            {sinkLogoPath && <SVG src={sinkLogoPath} className="logo" />}
            {!sinkLogoPath && sinkIcon && <div className="logo"><i className="feather icon-server" /></div>}
            {!sourceLogoPath && !sinkLogoPath && !sourceIcon && !sinkIcon && <Tags colorProfile="guides" tags={tags} />}
            <div className="action">Read more</div>
          </footer>
        </div>
      </article>
    </Link>
  );
}

export default GuideItem;
