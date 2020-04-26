import { EventConverter } from './viewport-tracker.module.types';

export function getOperatorsOf(element: HTMLDivElement): EventConverter {
  return {
    toHeightInViewport: (event) => {
      const window = event.target.defaultView as Window;
      const elementSize = element.getBoundingClientRect();

      const isElementAboveViewport = elementSize.bottom < 0;
      const isElementUnderViewport = elementSize.top >= window.innerHeight;
      
      if (isElementAboveViewport || isElementUnderViewport) {
        return 0;
      }

      const isElementInViewport = elementSize.top >= 0 && elementSize.bottom <= window.innerHeight;

      if (isElementInViewport) {
        return elementSize.height;
      }

      const isElementHigherViewport = elementSize.top < 0;

      if (isElementHigherViewport) {
        const outOfViewport = Math.abs(elementSize.top);

        return elementSize.height - outOfViewport;
      }

      const isElementLowerViewport = elementSize.bottom > window.innerHeight;

      if (isElementLowerViewport) {
        const outOfViewport = elementSize.bottom - window.innerHeight;

        return elementSize.height - outOfViewport;
      }

      throw new Error('Something went wrong with this targetElement....');
    },
    toRatio: (value) => {
      return value / element.getBoundingClientRect().height;
    },
    distinctAndOneMore:  (() => {
      let previousValue: number | null = null;

      return (value: number) => {
        if (!previousValue) {
          previousValue = value;
  
          return true;
        }
  
        const targetElementHeight = element.getBoundingClientRect().height;
        
        const isEqualToPrevious = value === previousValue;
        const isMinHeight = value === 0;
        const isMaxHeight = value === targetElementHeight;
        const isBoundary = isMinHeight || isMaxHeight;
  
        previousValue = value;
  
        return !(isEqualToPrevious && isBoundary);
      };
    })(),
  };
};