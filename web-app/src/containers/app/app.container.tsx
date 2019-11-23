import React, { useEffect } from 'react';
import { 
  Header, 
  Body, 
  Footer 
} from '../../containers';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import './app.container.css';

export const App = () => {
  useEffect(() => {
    fromEvent(window, 'resize').pipe(
      map((event: Event): Window => {
        return event.target as Window;
      })
    ).subscribe((window: Window): void => {
      const viewportVH = window.innerHeight * 0.01;
      window.document.documentElement.style.setProperty('--viewportVH', `${viewportVH}px`);
    });

    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="app">
      <Header class="app__header" />
      <Body class="app__body" />
      <Footer class="app__footer" />
    </div>
  )
}