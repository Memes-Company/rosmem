import React, { useState, useRef, useEffect } from 'react';
import { BaseProps } from '../../types';
import { fromEvent, pipe, of, from } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import './footer.container.css';

export const Footer = (props: BaseProps) => {
  const [isTestLight, setIsTestLight] = useState(false)

  const footerElement = useRef<HTMLDivElement>(null);
  const footerBodyElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matchRGB: RegExp = new RegExp(/.+\((\d+)\,\s(\d+)\,\s(\d+).+/);
    const [, red, green, blue] = footerElement.current!.style.backgroundColor!.match(matchRGB)!;

    const subscription = fromEvent(document, 'scroll').pipe(
        // Number of pixels of footer content element showed on the screen
        map((value: any) => {
          return window.innerHeight - footerBodyElement.current!.getBoundingClientRect().top;
        }),
        // Trigger only when footer content element on the screen
        filter((scrollHeight: number) => {
          return scrollHeight >= 0;
        }),
        // Convert to percentages of footer showing 
        map((scrollHeight: number) => {
          return scrollHeight / footerBodyElement.current!.clientHeight;
        })
      ).subscribe((scrollPercentages: number) => {
        footerElement.current!.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${scrollPercentages})`;
      });
    return () => {
      subscription.unsubscribe();
    }
  });
  return (
    <div
      ref={footerElement}
      className={"footer" +
        (props.class ? " " + props.class : "") +
        (isTestLight ? "footer__text-light" : "")}
      style={{ backgroundColor: "rgba(66, 66, 66, 0)" }}>

      <div className="footer__title">
        <span className="footer-content">Footer Title</span>
      </div>
      <div ref={footerBodyElement} className="footer__body">
        <span className="footer-content">Footer Content...</span>
      </div>
    </div>
  )
}