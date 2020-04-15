import * as React from 'react';
import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Props, State } from './viewport-tracker.module.types';

export class ViewportTracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      forwardedRef: React.createRef(),
      progress: 0,
    };
  };

  private getHeightInViewportOf(element: HTMLElement) {
    return (event: React.ChangeEvent<Document>): number => {
      const window = event.target.defaultView as Window;

      return window.innerHeight - element.getBoundingClientRect().top;
    };
  }

  private getWhenElementInViewport(heightInViewport: number) {
    return heightInViewport >= 0;
  }; 

  private heightInViewportToRatioOf(element: HTMLElement) {
    return (heightInViewport: number): number => {
      return heightInViewport / element.clientHeight;
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

    const subscription = fromEvent<React.ChangeEvent<Document>>(targetDocument, 'scroll')
      .pipe(
        map(
          this.getHeightInViewportOf(targetElement)),
        filter(
          this.getWhenElementInViewport),
        map(
          this.heightInViewportToRatioOf(targetElement)))
      .subscribe(
        (ratio: number) => {
          this.setState({
            progress: ratio,
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
      progress,
    } = this.state;

    return this.props.children({forwardedRef, progress});
  }
}