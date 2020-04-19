import * as React from 'react';
import { Subscription } from 'rxjs';

export interface Props {
  children: (targetProps: TargetProps) => React.ReactNode;
}

export interface State extends TargetProps {
  subscription?: Subscription;
}

export interface TargetProps {
  forwardedRef: React.RefObject<HTMLDivElement>;
  visibilityRatio: number;
}

export interface TargetElementActions {
  aboveViewport: FilterFunction,
  underViewport: FilterFunction,
  entireInViewport: FilterFunction,
  partiallyAboveViewport: FilterFunction,
  partiallyInViewport: FilterFunction,
  partiallyUnderViewport: FilterFunction,
  heightInViewport: CallbackFunction;
  eventToViewportTrackerEvent: (event: React.ChangeEvent<Document>) => React.ChangeEvent<Document>;
  not:() => TargetElementActions;
}

export interface ConverterFunctions {
  toTrackerEvent: ConverterFunction;
}

export interface FilterFunctions {
  aboveViewport: FilterFunction,
  partiallyAboveViewport: FilterFunction,
  entireInViewport: FilterFunction,
  partiallyUnderViewport: FilterFunction,
  underViewport: FilterFunction,
  tuplePartiallyInViewport: TupleFilterFunction<TrackerEvent>;
}

export interface EventFilter {
  aboveViewport: TupleFilterFunction<TrackerEvent>;
  entireInViewport: TupleFilterFunction<TrackerEvent>;
  underViewport: TupleFilterFunction<TrackerEvent>;
  not: () => EventFilter;
}

export interface CalculationFunctions {
  aboveViewport: CalculationFunction,
  partiallyAboveViewport: CalculationFunction,
  entireInViewport: CalculationFunction,
  partiallyUnderViewport: CalculationFunction,
  underViewport: CalculationFunction,
}

export enum ElementState {
  AboveViewport = 'AboveViewport',
  PartiallyAboveViewport = 'PartiallyAboveViewport',
  EntireInViewport = 'EntireInViewport',
  PartiallyUnderViewport = 'PartiallyUnderViewport',
  UnderViewport = 'UnderViewport',
}

export interface Coordinates {
  top: number;
  bottom: number;
}

export interface TrackerEvent {
  heightInViewport: number;
  elementState: ElementState;
}

export type TypleEvent<T = React.ChangeEvent<Document>> = [T, T];

export type CallbackFunction<T = React.ChangeEvent<Document>> = (event: T, index?: number) => number;

export type FilterFunction<T = React.ChangeEvent<Document>> = (event: T, index?: number) => boolean;

export type TupleFilterFunction<T = React.ChangeEvent<Document>> = (events: [T, T]) => boolean;

export type CalculationFunction<T = React.ChangeEvent<Document>> = (event: T, index?: number) => number;

export type ConverterFunction<T = React.ChangeEvent<Document>> = (event: T, index?: number) => TrackerEvent;