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