import { RefObject } from 'react';
import { Subscription } from 'rxjs';

import { TargetProps } from 'src/modules/viewport-tracker';
import { SpacerProps } from 'src/modules/frame';

export interface Props extends TargetProps, SpacerProps {

}

export interface State {
  rootRef: RefObject<HTMLDivElement>;
  ratioSubscription?: Subscription;
  isSecondRender: boolean | null;
}