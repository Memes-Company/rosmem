import * as React from 'react';
import { Observable } from 'rxjs';
import classnames from 'classnames';

import { FooterTitle, FooterContent } from './components/pure';
import { getOperatorsOf } from './footer.module.helper';
import { Props, State } from './footer.module.types';
import styles from './footer.module.css';

const subscribeToRatioFlow = (ratioFlow: Observable<number> | null, rootElement: HTMLDivElement | null) => {
  if (ratioFlow === null) {
    return null;
  }

  if (rootElement === null) {
    throw new Error('Root element is \'null\'');
  }

  const {
    setBackgroundColor,
    setColor,
  } = getOperatorsOf(rootElement);

  ratioFlow.subscribe(ratio => {
    setBackgroundColor(ratio);
    setColor(ratio);
  });
};

export class Footer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rootRef: React.createRef<HTMLDivElement>(),
      isSecondRender: false,
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { isSecondRender } = state;

    if (isSecondRender === false) {
      return {
        isSecondRender: true,
      };
    }

    if (isSecondRender) {
      const { ratioFlow } = props;
      const {
        rootRef: {
          current: rootElement,
        },
        ratioSubscription: subscription,
      } = state;

      if (subscription) {
        return null;
      }

      const ratioSubscription = subscribeToRatioFlow(ratioFlow, rootElement);

      return { ratioSubscription };
    }

    return null;
  }

  render() {
    const {
      targetRef,
      spacer,
    } = this.props;

    const {
      rootRef,
    } = this.state;

    return (
      <footer ref={rootRef} className={styles.root}>
        <div className={classnames(styles.title, spacer)}>
          <FooterTitle />
        </div>
        <div ref={targetRef} className={styles.content}>
          <FooterContent />
        </div>
        <div className={styles.creators}>
          Создано NaN'ом и Null'ом c любовью
        </div>
      </footer>
    );
  }
}
