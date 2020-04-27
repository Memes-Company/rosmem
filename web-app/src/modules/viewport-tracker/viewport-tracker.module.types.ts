import * as React from 'react';
import { Observable } from 'rxjs';

export interface Props {
  children: (targetProps: TargetProps) => React.ReactNode;
}

export interface State extends TargetProps {

}

export interface TargetProps {
  ratioFlow: Observable<number> | null;
  forwardedRef: React.RefObject<HTMLDivElement>;
}

export interface EventConverter {
  toHeightInViewport: (event: React.ChangeEvent<Document>) => number;
  toRatio: (value: number) => number;
  distinctAndOneMore: (value: number) => boolean;
}