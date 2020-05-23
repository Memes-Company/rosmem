import { Subscription } from 'rxjs';

export interface Props {

}

export interface State {
  isActive: boolean;
  refRoot: React.RefObject<HTMLDivElement>;
  clickSubscription: Subscription | null;
}
