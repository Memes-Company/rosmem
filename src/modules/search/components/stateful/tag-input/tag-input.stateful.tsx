import * as React from 'react';
import { fromEvent, Subscription } from 'rxjs';

import { getOperatorsOf } from './tag-input.stateful.helper';
import { Props, State } from './tag-input.stateful.types';
import styles from './tag-input.module.css';

export class TagInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rootRef: React.createRef(),
      valueRef: React.createRef(),
      inputRef: React.createRef(),
    };
  }

  componentDidMount() {
    const {
      rootRef: {
        current: rootElement,
      },
      valueRef: {
        current: valueElement,
      },
      inputRef: {
        current: inputElement,
      },
    } = this.state;

    if (!rootElement) {
      throw new Error('rootElement is null or undefined.');
    }

    if (!valueElement) {
      throw new Error('valueElement is null or undefined.');
    }

    if (!inputElement) {
      throw new Error('inputElement is null or undefined.');
    }

    const { setValueDataset } = getOperatorsOf(rootElement);

    valueElement.dataset.value = ' ';
    const inputSubscription = fromEvent<React.ChangeEvent<HTMLInputElement>>(inputElement, 'input')
      .subscribe(event => {
        setValueDataset(event);
      });

    this.setState({
      inputSubscription,
    });
  }

  componentWillUnmount() {
    const { inputSubscription } = this.state;

    (inputSubscription as Subscription).unsubscribe();
  }

  render() {
    const {
      rootRef,
      valueRef,
      inputRef,
    } = this.state;

    return (
      <label 
        ref={rootRef}
        className={styles.root}>
        <span
          ref={valueRef}
          className={styles.value} />
        <input
          ref={inputRef}
          className={styles.input}
          type="text" />
      </label>
    );
  }
}
