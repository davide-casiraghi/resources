import React from 'react';

import Link from '@docusaurus/Link';
import Tags from '@site/src/components/Tags';

import {enrichTags} from '@site/src/exports/tags';

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

  return (
    <Link to={permalink + '/'} className={`guide-item`}>
      <article>
        <div className={`guide-item__inner domain-bg domain-bg--${domainBG} domain-bg--hover`}>
          <header>
            <div className="guide-item__category category">{categories[0].name}</div>
            <h3 className="guide-item__title" title={title}>{seriesPosition && (seriesPosition + '. ')}{coverLabel || title}</h3>
          </header>
          <footer>
            <Tags colorProfile="guides" tags={tags} />
            <div className="action">Read more</div>
          </footer>
        </div>
      </article>
    </Link>
  );
}

export default GuideItem;
