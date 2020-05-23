import * as React from 'react';

import { Search } from 'src/modules/search';

import styles from './header.module.css';

export class Header extends React.PureComponent {
  render() {
    return (
      <header className={styles.root}>
        <Search />
      </header>
    );
  }
}
