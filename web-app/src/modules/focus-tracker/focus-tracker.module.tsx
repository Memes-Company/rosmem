import * as React from 'react';

import { getOperatorsOf } from './focus-tracker.module.helper';
import {
  Props,
  State,
  TargetProps,
} from './focus-tracker.module.types';

export class FocusTracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFocus: false,
      forwardedRef: React.createRef<HTMLDivElement>(),
    };
  }

  private onTargetFocus = () => {
    const { isFocus } = this.state;

    if (isFocus) {
      return;
    }

    this.setState({
      isFocus: true,
    });
  }

  onTargetBlur = (event: FocusEvent) => {
    const { relatedTarget } = event;
    const {
      forwardedRef: {
        current: rootElement,
      },
    } = this.state;
    
    if (!rootElement) {
      throw new Error('rootElement refers to null or undefined.');
    }

    if (relatedTarget === null) {
      this.setState({
        isFocus: false,
      });

      return;
    }

    const { rootIsParentOf } = getOperatorsOf(rootElement);

    const isTargetElementChild = rootIsParentOf(relatedTarget as HTMLDivElement);

    if (!isTargetElementChild) {
      this.setState({
        isFocus: false,
      });
    }
  }

  componentDidMount() {
    const {
      forwardedRef: {
        current: targetElement,
      },
    } = this.state;

    if(!targetElement) {
      throw new TypeError('targetElement is null or undefined.');
    }

    const listenerOptions: AddEventListenerOptions = {
      capture: true,
      passive: true,
    };

    targetElement.addEventListener('focus', this.onTargetFocus, listenerOptions);
    targetElement.addEventListener('blur', this.onTargetBlur, listenerOptions);
  }

  render() {
    const { children } = this.props;

    const { forwardedRef, isFocus } = this.state;

    const targetProps: TargetProps = {
      forwardedRef,
      isFocus,
    };

    return children(targetProps);
  }
}
