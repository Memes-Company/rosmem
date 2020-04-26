import { TargetProps } from 'src/modules/viewport-tracker';
import { SpacerProps } from 'src/modules/frame';
import { RefObject } from 'react';
import { Observable } from 'rxjs';

export interface Props extends TargetProps, SpacerProps {
  
}

export interface State {
  rootRef: RefObject<HTMLDivElement>;
  ratioSubscription?: Observable<number>;
  isSecondRender: boolean | null;
}