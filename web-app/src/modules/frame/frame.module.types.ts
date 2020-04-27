import { Subscription } from 'rxjs';

export interface Props {
  children: (spacerProps: SpacerProps) => React.ReactElement;
}

export interface State {
  resizeSubscription?: Subscription;
  root: React.RefObject<HTMLDivElement>;
}

export interface SpacerProps {
  spacer: string;
}