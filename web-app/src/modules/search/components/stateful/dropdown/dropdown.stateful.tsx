import * as React from 'react';

import styles from './dropdown.module.css';

export class Dropdown extends React.PureComponent {
  render() {
    return (
      <div className={styles.root}>
        Dropdown component
      </div>
    );
  }
}
