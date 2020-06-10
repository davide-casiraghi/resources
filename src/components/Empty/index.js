import React from 'react';

import classnames from 'classnames';
import styles from './styles.module.css';

function Empty({text}) {
  return <section className="empty">
    <div className={classnames(styles.text)}>{text}</div>
  </section>;
}

export default Empty;
