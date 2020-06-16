import React from 'react';

import classnames from 'classnames';
import './styles.css';

function Avatar({bio, className, github, fullName, nameSuffix, rel, size, subTitle, vertical}) {
  const displayName = fullName ? fullName : new URL(github).pathname.substring(1);
  return (
    <div className={classnames('avatar', className, {[`avatar--${size}`]: size, 'avatar--vertical': vertical})}>
      <img
        className={classnames('avatar__photo', `avatar__photo--${size}`)}
        src={github + '.png'}
      />
      <div className="avatar__intro">
        <div className="avatar__name"><a href={github} target="_blank" rel={rel}>{displayName}</a>{nameSuffix}</div>
      </div>
    </div>
  );
}

export default Avatar;
