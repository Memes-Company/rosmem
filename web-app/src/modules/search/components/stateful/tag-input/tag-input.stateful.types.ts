import { Subscription } from 'rxjs';

export interface Props {
  
}

export interface State {
  rootRef: React.RefObject<HTMLLabelElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  valueRef: React.RefObject<HTMLDivElement>;
  inputSubscription?: Subscription;
}
