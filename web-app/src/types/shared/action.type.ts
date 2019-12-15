import { Action as ReduxAction} from 'redux';

export type Action<T = string, P = object> = {
  payload: P;
} & ReduxAction<T>