import * as React from 'react';
import classnames from 'classnames';

import { Field, Dropdown } from './components/stateful';
import { Props, State } from './search.module.types';
import styles from './search.module.css';

export class Search extends React.PureComponent<Props, State> {
  render() {
    const { forwardedRef, isFocus } = this.props;

    const dropdownStyles = {
      [styles.dropdown]: true,
      [styles.active]: isFocus,
    }

    return (
      <div
        ref={forwardedRef}
        className={styles.root}
      >
        <Field />
        <div className={classnames(dropdownStyles)}>
          <Dropdown />
        </div>
      </div>
    );
  }
}
