import React, { useEffect } from 'react';
import { 
  Header, 
  Body, 
  Footer 
} from '../../containers';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import './app.container.css';

export const App = () => {
  useEffect(() => {
    fromEvent<React.ChangeEvent<Window>>(window, 'resize').pipe(
      tap((event: React.ChangeEvent<Window>): void => {
        const viewportVH = event.target.innerHeight * 0.01;
        event.target.document.documentElement.style.setProperty('--viewportVH', `${viewportVH}px`);
      }),
      map((event: React.ChangeEvent<Window>): number => {
          return event.target.pageYOffset;
      })
    ).subscribe((pageYOffset: number): void => {
      if (pageYOffset < 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });

    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="app">
      <Header className="app__header" />
      <Body className="app__body" />
      <Footer className="app__footer" />
    </div>
  )
}