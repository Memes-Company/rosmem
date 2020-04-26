import * as React from 'react';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

import { getOperatorsOf } from './frame.helper';
import {
  Props,
  State,
  SpacerProps,
} from './frame.module.types';
import styles from './frame.module.css';

export class Frame extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      root: React.createRef(),
    };
  }

  componentDidMount() {
    const {
      root: {
        current: rootElement,
      },
    } = this.state;

    if (rootElement === null) {
      throw new Error('\'rootElement\' is null.');
    }

    const window = rootElement.ownerDocument?.defaultView;

    if (!window) {
      throw new TypeError('it\'s impossible, but your root\'s "window" is null or undefined. (O_O;)');;
    }

    const {
      setViewportVH,
      onWindowResize,
    } = getOperatorsOf(rootElement);

    const resizeSubscription = fromEvent<React.ChangeEvent<Window>>(window, 'resize')
      .pipe(
        tap(setViewportVH))
      .subscribe(onWindowResize);

    this.setState({ resizeSubscription });

    window.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {
    const { resizeSubscription } = this.state;

    resizeSubscription && resizeSubscription.unsubscribe();
  }

  render() {
    const { children } = this.props;
    const { root } = this.state;

    const spacerProps: SpacerProps = {
      spacer: styles.spacer,
    };

    return (
      <div ref={root} className={styles.root}>
        {children(spacerProps)}
      </div>
    );
  }
}