import {
  fromEvent,
  Observable,
  merge,
  of,
} from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { FocusEvent } from 'react';

export class FocusListener {
  static __ref: FocusListener;

  private listener: Observable<[FocusEvent, FocusEvent | null]>;

  private constructor(documentRef: Document) {
    const listenerOptions = {
      capture: true,
    } as EventListenerOptions;

    const focusListener = fromEvent<FocusEvent>(documentRef, 'focus', listenerOptions);
    const blurListener = fromEvent<FocusEvent>(documentRef, 'blur', listenerOptions);

    this.listener = focusListener
      .pipe(
        withLatestFrom(
          merge(
            blurListener,
            of(null))));
  }

  static __shoudBe() {
    return {
      __negative: false,
      initialized() {
        const isAwaiting = !FocusListener.__ref;

        if (isAwaiting !== this.__negative) {
          if (this.__negative) {
            throw new Error('FocusListener already was initialized.');
          } else {
            throw new Error('FocusListener not been initialized yet.');
          }
        }
      },
      not() {
        return {
          ...this,
          __negative: !this.__negative,
        };
      },
    };
  }

  private __get() {
    return this.listener;
  }

  static init(documentRef: Document = document) {
    FocusListener.__shoudBe().not().initialized();

    FocusListener.__ref = new FocusListener(documentRef);
  }

  static get() {
    FocusListener.__shoudBe().initialized();

    return FocusListener.__ref.__get();
  }
}
