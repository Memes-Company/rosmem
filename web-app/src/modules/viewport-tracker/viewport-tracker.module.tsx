import * as React from 'react';
import { fromEvent } from 'rxjs';
import { 
  map, 
  filter, 
  throttleTime, 
} from 'rxjs/operators';
import { getOperatorsOf } from './viewport-tracker.module.helper';
import { Props, State } from './viewport-tracker.module.types';

export class ViewportTracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      forwardedRef: React.createRef(),
      visibilityRatio: 0,
    };
  }

  componentDidMount() {
    const { 
      forwardedRef: {
        current: targetElement, 
      }, 
    } = this.state;

    if (!targetElement) {
      throw new TypeError('"targetElement" refers to an non-HTMLElement type object. Check the child element.');
    }
    
    const targetDocument: Document | null = targetElement.ownerDocument;
    
    if (!targetDocument) {
      throw new TypeError('it\'s impossible, but your child\'s "document" is null. (O_O;)');
    }

    const eventOptions = {
      passive: true,
    } as EventListenerOptions;

    const {
      toHeightInViewport,
      toRatio,
      distinctAndOneMore,
    } = getOperatorsOf(targetElement);

    // Add some functionality for pausing subscription until targetElement not in viewport
    const subscription = fromEvent<React.ChangeEvent<Document>>(targetDocument, 'scroll', eventOptions)
      .pipe(
        throttleTime(50),
        map(toHeightInViewport),
        map(toRatio),
        filter(distinctAndOneMore))
      .subscribe(
        (ratio: number) => {
          this.setState({
            visibilityRatio: ratio,
          });
        });

    this.setState({
      subscription,
    });
  }

  componentWillUnmount() {
    const { subscription } = this.state;

    if (subscription) {
      subscription.unsubscribe();
    }
  }

  render() {
    const {
      forwardedRef,
      visibilityRatio,
    } = this.state;

    return this.props.children({ forwardedRef, visibilityRatio });
  }
}