import { ViewportTrackerTypes } from 'src/modules/viewport-tracker';
import { RefObject } from 'react';
import { Observable } from 'rxjs';

export interface Props extends ViewportTrackerTypes.TargetProps {

}

export interface State {
  rootRef: RefObject<HTMLDivElement>;
  ratioSubscription?: Observable<number>;
  isSecondRender: boolean | null;
}