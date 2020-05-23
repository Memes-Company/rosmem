import classnames from 'classnames';
import * as React from 'react';
import { fromEvent } from 'rxjs';

import { getOperatorsOf } from './search.module.helper';
import { Field, Dropdown } from './components/stateful';
import { Props, State } from './search.module.types';
import styles from './search.module.css';

// TODO: Need to refactor this module
// take out all side-functionality:
// - click handler;
// - key up handler.
export class Search extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      refRoot: React.createRef(),
      isActive: false,
      clickSubscription: null,
    };
  }

  componentDidMount() {
    const { 
      refRoot: {
        current: rootElement,
      }
    } = this.state;

    if (!rootElement) {
      throw new Error('rootElement refers to null or undefined.');
    }

    const { rootIsParentOf } = getOperatorsOf(rootElement);

    const clickSubscription = fromEvent(document, 'click')
      .subscribe(event => {
        if (!rootIsParentOf(event.target as HTMLDivElement)) {
          this.setState({
            isActive: false,
          });
        }
      });

    this.setState({
      clickSubscription,
    });
  }

  componentWillUnmount() {
    const { clickSubscription } = this.state;

    if (!clickSubscription) {
      return;
    }

    clickSubscription.unsubscribe();
  }

  onClick = () => {
    const { isActive } = this.state;

    if (isActive) {
      return;
    }

    this.setState({
      isActive: true,
    });
  }

  onKeyUp = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (key !== 'Escape') {
      return;
    }

    this.setState({
      isActive: false,
    });
  }

  render() {
    const { 
      refRoot, 
      isActive, 
    } = this.state;

    const dropdownStyles = {
      [styles.dropdown]: true,
      [styles.active]: isActive,
    };

    return (
      <div
        ref={refRoot}
        className={styles.root}
        onClick={this.onClick}
        onKeyUp={this.onKeyUp}
      >
        <Field />
        <div className={classnames(dropdownStyles)}>
          <Dropdown />
        </div>
      </div>
    );
  }
}
