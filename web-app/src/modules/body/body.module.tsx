import * as React from 'react';

import styles from './body.module.css';

export class Body extends React.Component {
  render() {
    return (
      <article className={styles.root}>
        Body
      </article>
    );
  }
}