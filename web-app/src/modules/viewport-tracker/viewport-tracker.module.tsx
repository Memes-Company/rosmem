import * as React from 'react';
import { fromEvent } from 'rxjs';
import { 
  map, 
  filter, 
  throttleTime,
  debounceTime, 
} from 'rxjs/operators';
import { getOperatorsOf } from './viewport-tracker.module.helper';
import { Props, State, TargetProps } from './viewport-tracker.module.types';

export class ViewportTracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      forwardedRef: React.createRef(),
      ratioFlow: null,
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
      throw new TypeError('it\'s impossible, but your child\'s "document" is null or undefined. (O_O;)');
    }

    const eventOptions = {
      passive: true,
    } as EventListenerOptions;

    const {
      toHeightInViewport,
      toRatio,
      distinctAndOneMore,
    } = getOperatorsOf(targetElement);

    const ratioFlow = fromEvent<React.ChangeEvent<Document>>(targetDocument, 'scroll', eventOptions)
      .pipe(
        throttleTime(50),
        debounceTime(50),
        map(toHeightInViewport),
        map(toRatio),
        filter(distinctAndOneMore))

    this.setState({
      ratioFlow
    })
  }

  render() {
    const {
      children,
      // ...rest
    } = this.props;

    const {
      forwardedRef,
      ratioFlow,
    } = this.state;

    const childrenProps: TargetProps = {
      forwardedRef,
      ratioFlow,
      // ...rest
    }

    return children(childrenProps);
  }
}