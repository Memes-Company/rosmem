import React, { useState, useRef, useEffect } from 'react';
import { ClassName } from '../../types';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { map, tap, filter, distinctUntilChanged } from 'rxjs/operators';
import {ReactComponent as Logoname} from '../../assets/svg/logoname.svg';
import './footer.container.css';

export const Footer: React.FC<ClassName<{}>> = ({className}) => {
  const [isTestLight, setIsTestLight] = useState(false)

  const footerElement = useRef<HTMLDivElement>(null);
  const footerBodyElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getRGBAstring = (red: number = 0, green: number = 0, blue: number = 0, opacity: number = 0): string => {
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    }

    const isFooterBackgroundChanging = new BehaviorSubject(false);
    const matchRGB: RegExp = new RegExp(/.+\((\d+),\s(\d+),\s(\d+).+/);
    const [, red, green, blue] = footerElement.current!.style.backgroundColor!.match(matchRGB)! as [unknown, number, number, number];

    isFooterBackgroundChanging.pipe(
        distinctUntilChanged(),
        // Trigger only when it's not changing
        filter(value => !value)
      ).subscribe(value => {
        footerElement.current!.style.backgroundColor = getRGBAstring(red, green, blue);
      });

    const subscription = fromEvent(document, 'scroll').pipe(
        // Number of pixels of footer content element showed on the screen
        map((value: any): number => {
          return window.innerHeight - footerBodyElement.current!.getBoundingClientRect().top;
        }),
        tap((scrollHeight : number): void => {
          isFooterBackgroundChanging.next(scrollHeight >= 0);
        }),
        // Trigger only when footer content element on the screen
        filter((scrollHeight: number) => {
          return scrollHeight >= 0;
        }),
        // Convert to percentages of footer showing 
        map((scrollHeight: number): number => {
          return scrollHeight / footerBodyElement.current!.clientHeight;
        }),
        tap((scrollPercentages: number): void => {
          setIsTestLight(scrollPercentages >= .8);
        })
      ).subscribe((scrollPercentages: number): void => {
        footerElement.current!.style.backgroundColor = getRGBAstring(red, green, blue, scrollPercentages);
      });
    return () => {
      subscription.unsubscribe();
    }
  }, []);
  return (
    <div
      ref={footerElement}
      className={"footer" +
        (className ? " " + className : "") +
        (isTestLight ? " footer_text-light" : " footer_text-dark")}
      style={{ backgroundColor: "rgba(66, 66, 66, 0)" }}>

      <div className="footer__title">
        <Logoname className={"footer__logoname" + 
          (isTestLight ? " footer__logoname_light" : " footer__logoname_dark") }
        />
      </div>
      <div ref={footerBodyElement} className="footer__body">
        <span className="footer-content">Footer Content</span>
      </div>
    </div>
  )
}