import * as React from 'react';
import { ReactComponent as LogonameSVG } from '../../../assets/svg/logoname.svg';
import styles from './footer-title.module.css';

export class FooterTitle extends React.PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <LogonameSVG className={styles.logo} />
      </div>
    );
  }
}
