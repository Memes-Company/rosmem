import {
  Coordinates,
  ElementState,
  FilterFunction,
  CallbackFunction,
  TypleEvent,
  CalculationFunction,
  ConverterFunctions,
  FilterFunctions,
  CalculationFunctions,
  TrackerEvent,
  EventFilter,
  TupleFilterFunction,
} from './viewport-tracker.module.types';

export function convertEventOf(element: HTMLDivElement): ConverterFunctions {
  const converterFunctions: ConverterFunctions = {
    toTrackerEvent: (event): TrackerEvent => {
      const elementState = elementStates.find((elementState: ElementState) => {
        return mapStateToFilter[elementState](event);
      });

      if (elementState === undefined) {
        throw new Error('unrigistred elementState.');
      };

      const heightInViewport = mapStateToHeight[elementState](event);

      return {
        heightInViewport,
        elementState,
      };
    },
  };

  const elementStates: Array<ElementState> = Object.keys(ElementState) as any;

  const mapStateToFilter = {
    [ElementState.AboveViewport]: filterOf(element).aboveViewport,
    [ElementState.PartiallyAboveViewport]: filterOf(element).partiallyAboveViewport,
    [ElementState.EntireInViewport]: filterOf(element).entireInViewport,
    [ElementState.PartiallyUnderViewport]: filterOf(element).partiallyUnderViewport,
    [ElementState.UnderViewport]: filterOf(element).underViewport,
  } as {[key in keyof typeof ElementState]: FilterFunction};
  
  const mapStateToHeight = {
    [ElementState.AboveViewport]: heightInViewportOf(element).aboveViewport,
    [ElementState.PartiallyAboveViewport]: heightInViewportOf(element).partiallyAboveViewport,
    [ElementState.EntireInViewport]: heightInViewportOf(element).entireInViewport,
    [ElementState.PartiallyUnderViewport]: heightInViewportOf(element).partiallyUnderViewport,
    [ElementState.UnderViewport]: heightInViewportOf(element).underViewport,
  } as {[key in keyof typeof ElementState]: CalculationFunction};

  return converterFunctions;
};

export const filterOf = (element: HTMLDivElement): FilterFunctions => {
  const filterFunctions: FilterFunctions = {
    aboveViewport: (event) => {
      const { bottom } = getCoordinatesOf(element);

      return bottom < 0;
    },
    partiallyAboveViewport: (event) => {
      const window = event.target.defaultView as Window;
      const { top, bottom } = getCoordinatesOf(element);

      const isTopAboveViewport = top < 0;
      const isBottomInViewport = bottom >= 0 && bottom <= window.innerHeight;

      return isTopAboveViewport && isBottomInViewport;
    },
    entireInViewport: (event) => {
      const window = event.target.defaultView as Window;
      const { top, bottom } = getCoordinatesOf(element);

      const isTopInViewport = top >= 0;
      const isBottomInViewport = bottom <= window.innerHeight;

      return isTopInViewport && isBottomInViewport;
    },
    partiallyUnderViewport: (event) => {
      const window = event.target.defaultView as Window;
      const { top, bottom } = getCoordinatesOf(element);

      const isTopInViewport = top > 0 && top <= window.innerHeight;
      const isBottomUnderViewport = bottom > window.innerHeight;
      
      return isTopInViewport && isBottomUnderViewport;
    },
    underViewport: (event) => {
      const window = event.target.defaultView as Window;
      const { top } = getCoordinatesOf(element);

      return top > window.innerHeight;
    },
    tuplePartiallyInViewport: ([currentEvent, previousEvent]) => {
      const isCoupleStatesEqual = currentEvent.elementState === previousEvent.elementState;
      
      const isAboveViewport = isCoupleStatesEqual && currentEvent.elementState === ElementState.AboveViewport;
      const isEntireInViewport = isCoupleStatesEqual && currentEvent.elementState === ElementState.EntireInViewport;
      const isUnderViewport = isCoupleStatesEqual && currentEvent.elementState === ElementState.UnderViewport;

      return !isAboveViewport || !isEntireInViewport || !isUnderViewport;
    },
  };

  return filterFunctions;
};

export const eventFilter = (): EventFilter => {
  let negotiation = false;

  const filterFunctions: EventFilter = {
    aboveViewport: ([current, previous]) => {

      const isCurrentAboveViewport = current.elementState === ElementState.AboveViewport;
      const isPreviousAboveViewport = previous.elementState === ElementState.AboveViewport;

      const result = isCurrentAboveViewport && isPreviousAboveViewport;

      return XOR(result, negotiation);
    },
    entireInViewport: ([current, previous]) => {
      const isCurrentEntireInViewport = current.elementState === ElementState.EntireInViewport;
      const isPreviousEntireInViewport = previous.elementState === ElementState.EntireInViewport;

      const result = isCurrentEntireInViewport && isPreviousEntireInViewport;

      return XOR(result, negotiation);
    },
    underViewport: ([current, previous]) => {
      const isCurrentUnderViewport = current.elementState === ElementState.UnderViewport;
      const isPreviousUnderViewport = previous.elementState === ElementState.UnderViewport;

      const result = isCurrentUnderViewport && isPreviousUnderViewport;

      return XOR(result, negotiation);
    },
    not: () => {
      negotiation = !negotiation;

      return filterFunctions;
    },
  };

  return filterFunctions;
};

export const heightInViewportOf = (element: HTMLDivElement): CalculationFunctions => {
  const calculationFunctions: CalculationFunctions = {
    aboveViewport: (event) => {
      return 0;
    },
    partiallyAboveViewport: (event) => {
      const { bottom } = getCoordinatesOf(element);
      
      return bottom;
    },
    entireInViewport: (event): number => {
      const { top, bottom } = getCoordinatesOf(element);

      return bottom - top;
    },
    partiallyUnderViewport: (event) => {
      const window = event.target.defaultView as Window;
      const { top } = getCoordinatesOf(element);

      return window.innerHeight - top;
    },
    underViewport: () => {
      return 0;
    },
  };

  return calculationFunctions;
};

export const getCoordinatesOf = (element: HTMLDivElement): Coordinates => ({
  top: element.getBoundingClientRect().top,
  bottom: element.getBoundingClientRect().bottom,
});

export const filterByPreviousEvent = (...args: FilterFunction[]) => ([previous]: TypleEvent) => {
  return args.every(filter => filter(previous));
};

export const combineFilters = <T>(...filters: TupleFilterFunction<T>[]) => (typleEvents: TypleEvent<T>) => {
  return filters.every(filter => filter(typleEvents));
};

export const takeLastEvent = <T>(callback: CallbackFunction<T>) => ([previous, current]: TypleEvent<T>) => {
  return callback(current);
};

export const getHeightInViewport = (event: TrackerEvent) => event.heightInViewport;

export const getVisibilityRationOf = (element: HTMLDivElement) => (height: number) => {
  const { top, bottom } = getCoordinatesOf(element);
  const maxHeight = bottom - top;

  return height / maxHeight;
};

export const XOR = (a: boolean, b: boolean): boolean => a !== b;

// export const eventToViewportTrackerEvent = (event: HTMLDivElement): ViewportTrackerEvent => {

// }