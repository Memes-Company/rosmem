import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Logo } from 'src/modules/shared/assets/svg';

import styles from './footer-title.module.css';

export class FooterTitle extends React.PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <SVG className={styles.logo} src={Logo} />
      </div>
    );
  }
}
