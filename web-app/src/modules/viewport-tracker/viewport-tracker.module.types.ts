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

export interface EventConverter {
  toHeightInViewport: (event: React.ChangeEvent<Document>) => number;
  toRatio: (value: number) => number;
  distinctAndOneMore: (value: number) => boolean;
}