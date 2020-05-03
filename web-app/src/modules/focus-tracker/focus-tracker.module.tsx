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
    const {
      forwardedRef: {
        current: rootElement,
      },
    } = this.state;

    const document = (event.target as Element).ownerDocument as Document;

    if (!rootElement) {
      throw new Error('rootElement refers to null or undefined.');
    }

    const { rootIsParentOf } = getOperatorsOf(rootElement);

    document.addEventListener('focus', (event) => {
      const { target: targetElement } = event;

      const isTargetElementChild = rootIsParentOf(targetElement as HTMLDivElement);

      if (!isTargetElementChild) {
        this.setState({
          isFocus: false,
        });
      }
    }, { capture: true, once: true });
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

    targetElement.addEventListener('focus', this.onTargetFocus, { capture: true });
    targetElement.addEventListener('blur', this.onTargetBlur, { capture: true });

    console.log('targetElement:', targetElement);
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
